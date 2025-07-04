def test_root(client):
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json()["message"].startswith("SCADA-Lite")

def test_get_sensores(client):
    resp = client.get("/api/sensores/")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

def test_get_latest(client):
    resp = client.get("/api/sensores/latest")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)

def test_get_report(client):
    resp = client.get("/api/sensores/report")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
