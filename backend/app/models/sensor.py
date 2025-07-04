from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class SensorData(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tipo: str
    valor: float
    timestamp: datetime = Field(default_factory=datetime.utcnow)
