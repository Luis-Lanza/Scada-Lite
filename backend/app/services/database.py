from sqlmodel import SQLModel, create_engine, Session
from app.models.user import User  # Importa el modelo de usuario

DATABASE_URL = "sqlite:///./sensores.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
