from datetime import date, datetime
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import RegistroCigarroDB


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:63342",
        "http://127.0.0.1:63342",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

class CriarRegistroCigarro(BaseModel):
    quantidade: int = Field(gt=0)
    observacao: Optional[str] = None
    data_registro: Optional[date] = None

class AtualizarRegistroCigarro(BaseModel):
    quantidade: int = Field(gt=0)
    observacao: Optional[str] = None

class RegistroCigarroResposta(BaseModel):
    id: int
    data_hora: datetime
    quantidade: int
    observacao: Optional[str] = None

    model_config =  ConfigDict(from_attributes=True)

class ResumoDiaResposta(BaseModel):
    data: date
    total_cigarros: int
    total_registros: int

class MensagemResposta(BaseModel):
    mensagem: str

@app.get("/")
def inicio():
    return {"mensagem": "API Controle de Cigarros funcionando."}

@app.post("/registros", response_model=RegistroCigarroResposta)
def criar_registro(dados: CriarRegistroCigarro, db: Session = Depends(get_db)):
    data_hora_registro = datetime.now().replace(microsecond=0)

    if dados.data_registro:
        data_hora_registro = datetime.combine(
            dados.data_registro,
            datetime.now().time()
        ).replace(microsecond=0)

    novo_registro = RegistroCigarroDB(
        data_hora=data_hora_registro,
        quantidade=dados.quantidade,
        observacao=dados.observacao,
    )

    db.add(novo_registro)
    db.commit()
    db.refresh(novo_registro)

    return novo_registro

@app.get("/registros", response_model=list[RegistroCigarroResposta])
def listar_registros(db: Session = Depends(get_db)):
    return (db.query(RegistroCigarroDB).order_by(
    RegistroCigarroDB.id.asc())
    .all())

@app.get("/registros/hoje", response_model=list[RegistroCigarroResposta])
def listar_registros_hoje(db: Session = Depends(get_db)):
    hoje = datetime.now().date()

    inicio_dia = datetime.combine(hoje, datetime.min.time())
    fim_dia = datetime.combine(hoje, datetime.max.time())

    return db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.data_hora >= inicio_dia,
        RegistroCigarroDB.data_hora <= fim_dia,
    ).order_by(RegistroCigarroDB.id.asc()
    ).all()

@app.get("/registros/data/{data_registro}", response_model=list[RegistroCigarroResposta])
def listar_registros_por_data(data_registro: date, db: Session = Depends(get_db)):
    inicio_dia = datetime.combine(data_registro, datetime.min.time())
    fim_dia = datetime.combine(data_registro, datetime.max.time())

    return db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.data_hora >= inicio_dia,
        RegistroCigarroDB.data_hora <= fim_dia,
    ).order_by(
        RegistroCigarroDB.id.asc()
    ).all()

@app.get("/registros/{id_registro}", response_model=RegistroCigarroResposta)
def buscar_registro(id_registro: int, db: Session = Depends(get_db)):
    registro = db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.id == id_registro
    ).first()

    if registro:
        return registro

    raise HTTPException(
        status_code=404,
        detail="Registro não encontrado.",
    )

@app.put("/registros/{id_registro}", response_model=RegistroCigarroResposta)
def atualizar_registro(
        id_registro: int,
        dados: AtualizarRegistroCigarro,
        db: Session = Depends(get_db),
):
    registro = db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.id == id_registro
    ).first()

    if registro:
        registro.quantidade = dados.quantidade
        registro.observacao = dados.observacao

        db.commit()
        db.refresh(registro)

        return registro

    raise HTTPException(
        status_code=404,
        detail="Registro não encontrado.",
    )

@app.delete("/registros/{id_registro}", response_model=MensagemResposta)
def deletar_registro(id_registro: int, db: Session = Depends(get_db)):
    registro = db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.id == id_registro
    ).first()

    if registro:
        db.delete(registro)
        db.commit()
        return {"mensagem": "Registro deletado com sucesso."}

    raise HTTPException(
        status_code=404,
        detail="Registro não encontrado.",
    )

@app.get("/resumo/hoje", response_model=ResumoDiaResposta)
def resumo_hoje(db: Session = Depends(get_db)):
    hoje = datetime.now().date()

    inicio_dia = datetime.combine(hoje, datetime.min.time())
    fim_dia = datetime.combine(hoje, datetime.max.time())

    registros_de_hoje = db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.data_hora >= inicio_dia,
        RegistroCigarroDB.data_hora <= fim_dia,
    ).all()

    total_cigarros = sum(
        registro.quantidade for registro in registros_de_hoje
    )

    return {
        "data": hoje,
        "total_cigarros": total_cigarros,
        "total_registros": len(registros_de_hoje),
    }

@app.get("/resumo/data/{data_registro}", response_model=ResumoDiaResposta)
def resumo_por_data(data_registro: date, db: Session = Depends(get_db)):
    inicio_dia = datetime.combine(data_registro, datetime.min.time())
    fim_dia = datetime.combine(data_registro, datetime.max.time())

    registros_do_dia = db.query(RegistroCigarroDB).filter(
        RegistroCigarroDB.data_hora >= inicio_dia,
        RegistroCigarroDB.data_hora <= fim_dia,
    ).all()

    total_cigarros = sum(
        registro.quantidade for registro in registros_do_dia
    )

    return {
        "data": data_registro,
        "total_cigarros": total_cigarros,
        "total_registros": len(registros_do_dia),
    }