from fastapi import FastAPI
from app.services.database import create_db_and_tables
from app.routes import sensores
from app.simulador import iniciar_simulador

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    iniciar_simulador()

app.include_router(sensores.router, prefix="/api/sensores", tags=["Sensores"])

@app.get("/")
def root():
    return {"message": "SCADA-Lite Backend Running"}
