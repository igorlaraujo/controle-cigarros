# Controle de Cigarros

Projeto Full Stack em desenvolvimento para registrar, acompanhar e analisar o consumo diário de cigarros.

O objetivo do projeto é criar uma aplicação simples, prática e evolutiva, começando por uma API em Python com FastAPI e depois adicionando uma interface Front-End com HTML, CSS e JavaScript.

## Status do projeto

Em desenvolvimento.

Atualmente, o Back-End já possui uma API funcional com persistência em banco de dados SQLite.

## Tecnologias utilizadas

### Back-End

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

### Front-End

- HTML
- CSS
- JavaScript

O Front-End ainda será desenvolvido.

## Funcionalidades atuais

- Criar registro de consumo
- Listar todos os registros
- Listar registros do dia atual
- Listar registros por data específica
- Buscar registro por ID
- Atualizar registro
- Deletar registro
- Gerar resumo do dia atual
- Gerar resumo por data específica
- Validação de dados com Pydantic
- Persistência local com SQLite
- Configuração de CORS para integração com Front-End

## Rotas principais da API

### Registros

```text
POST   /registros
GET    /registros
GET    /registros/hoje
GET    /registros/data/{data_registro}
GET    /registros/{id_registro}
PUT    /registros/{id_registro}
DELETE /registros/{id_registro}
```

### Resumos

```text
GET /resumo/hoje
GET /resumo/data/{data_registro}
```

## Como rodar o Back-End

Acesse a pasta do Back-End:

```bash
cd backend
```

Ative o ambiente virtual, se necessário.

No Windows PowerShell:

```bash
.\.venv\Scripts\Activate.ps1
```

Inicie o servidor:

```bash
uvicorn main:app --reload
```

Acesse a documentação interativa da API:

```text
http://127.0.0.1:8000/docs
```

## Estrutura prevista do projeto

```text
controle-cigarros/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
├── .gitignore
└── README.md
```

## Objetivo de aprendizado

Este projeto está sendo desenvolvido com foco em prática de Back-End Python, organização de projeto Full Stack, consumo de API pelo Front-End e preparação para portfólio.