import pytest

TEST_USER = {
    "username": "testuser",
    "password": "testpass"
}

@pytest.fixture(scope="session")
def auth_headers(client):
    # Registra el usuario de test (ignora error si ya existe)
    client.post("/api/auth/register", json=TEST_USER)
    # Hace login y obtiene el token
    resp = client.post(
        "/api/auth/login",
        data=TEST_USER,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert resp.status_code == 200, f"Login fallo: {resp.text}"
    token = resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_root(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json()["message"].startswith("SCADA-Lite")

def test_get_sensores(client, auth_headers):
    resp = client.get("/api/sensores/", headers=auth_headers)
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

def test_get_latest(client, auth_headers):
    resp = client.get("/api/sensores/latest", headers=auth_headers)
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

def test_get_report(client, auth_headers):
    resp = client.get("/api/sensores/report", headers=auth_headers)
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
