from sqlalchemy import Column, DateTime, Integer, String

from database import Base

class RegistroCigarroDB(Base):
    __tablename__ = "registros_cigarros"

    id = Column(Integer, primary_key=True, index=True)
    data_hora = Column(DateTime, nullable=False)
    quantidade = Column(Integer, nullable=False)
    observacao = Column(String, nullable=False)

