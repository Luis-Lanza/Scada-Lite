# Simulador de sensores industriales para SCADA-Lite
import random
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from app.models.sensor import SensorData
from app.services.database import engine
from sqlmodel import Session

def generar_dato(tipo: str):
    if tipo == "temperatura":
        return round(random.uniform(20.0, 40.0), 2)
    elif tipo == "humedad":
        return round(random.uniform(30.0, 90.0), 2)
    return 0.0

def simular_sensores():
    with Session(engine) as session:
        for tipo in ["temperatura", "humedad"]:
            valor = generar_dato(tipo)
            sensor = SensorData(tipo=tipo, valor=valor, timestamp=datetime.utcnow())
            session.add(sensor)
        session.commit()

scheduler = BackgroundScheduler()
scheduler.add_job(simular_sensores, 'interval', seconds=10)

def iniciar_simulador():
    scheduler.start()
