from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models.sensor import SensorData
from app.services.database import get_session
from typing import List

from app.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)

@router.get("/", response_model=List[SensorData])
def get_all_sensores(session: Session = Depends(get_session)):
    sensores = session.exec(select(SensorData)).all()
    return sensores

@router.get("/latest", response_model=List[SensorData])
def get_latest_sensores(session: Session = Depends(get_session)):
    # Devuelve el último dato por tipo de sensor
    subquery = session.exec(select(SensorData.tipo).distinct())
    latest = []
    for tipo in subquery:
        sensor = session.exec(
            select(SensorData).where(SensorData.tipo == tipo).order_by(SensorData.timestamp.desc())
        ).first()
        if sensor:
            latest.append(sensor)
    return latest

@router.get("/report", response_model=List[SensorData])
def get_report(session: Session = Depends(get_session)):
    # Devuelve todos los datos (para exportar/reportar)
    sensores = session.exec(select(SensorData)).all()
    return sensores
