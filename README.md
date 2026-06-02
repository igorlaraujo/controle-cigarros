# Controle de Cigarros

Projeto Full Stack em desenvolvimento para registrar, acompanhar e analisar o consumo diário de cigarros.

A aplicação começou como uma API em Python com FastAPI e SQLite, e está evoluindo para uma interface Front-End em HTML, CSS e JavaScript puro, consumindo a API por meio da Fetch API.

## Status do projeto

Em desenvolvimento.

Atualmente, o projeto já possui:

* Back-End funcional com FastAPI
* Persistência de dados com SQLite
* Front-End em HTML, CSS e JavaScript
* Integração entre Front-End e Back-End usando Fetch API
* Cadastro, listagem, resumo e exclusão de registros pela interface

## Objetivo de aprendizado

Este projeto está sendo desenvolvido com foco em prática de desenvolvimento Full Stack Python, integrando conceitos de Back-End, Front-End, APIs REST, persistência de dados e organização de projeto para portfólio.

O desenvolvimento também acompanha a evolução dos estudos no curso Desenvolvedor Full Stack Python da EBAC, aplicando os conceitos aprendidos em um projeto pessoal real.

## Tecnologias utilizadas

### Back-End

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn
* CORS Middleware

### Front-End

* HTML5
* CSS3
* JavaScript
* Fetch API
* DOM API

## Funcionalidades atuais

### Back-End

* Criar registro de consumo
* Listar todos os registros
* Listar registros do dia atual
* Listar registros por data específica
* Buscar registro por ID
* Atualizar registro
* Deletar registro
* Gerar resumo do dia atual
* Gerar resumo por data específica
* Validação de dados com Pydantic
* Persistência local com SQLite
* Configuração de CORS para integração com o Front-End

### Front-End

* Interface visual com HTML, CSS e JavaScript puro
* Formulário para criação de novos registros
* Envio de registros para a API com Fetch API
* Exibição do resumo diário vindo do Back-End
* Listagem dos registros do dia vindos da API
* Exibição dos registros mais recentes primeiro
* Exibição de data, horário, quantidade e observação
* Exclusão de registros pela interface
* Modal personalizado para confirmação de exclusão
* Mensagens visuais de sucesso e erro
* Identidade visual inicial baseada em tons de palha, tabaco e fumaça

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

## Como rodar o projeto

### 1. Rodar o Back-End

Acesse a pasta do Back-End:

```powershell
cd backend
```

Ative o ambiente virtual, se necessário:

```powershell
.\.venv\Scripts\Activate.ps1
```

Inicie o servidor:

```powershell
uvicorn main:app --reload
```

A API ficará disponível em:

```text
http://127.0.0.1:8000
```

A documentação interativa estará disponível em:

```text
http://127.0.0.1:8000/docs
```

### 2. Abrir o Front-End

Com o Back-End rodando, abra o arquivo:

```text
frontend/index.html
```

O Front-End consome a API local em:

```text
http://127.0.0.1:8000
```

## Estrutura do projeto

```text
controle-cigarros/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── controle_cigarros.db
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── .gitignore
└── README.md
```

## Fluxo atual da aplicação

```text
Usuário preenche o formulário no Front-End
        ↓
JavaScript captura o envio
        ↓
Fetch API envia os dados para o FastAPI
        ↓
FastAPI valida e salva no SQLite
        ↓
Front-End atualiza resumo e registros do dia
```

## Próximos passos planejados

* Melhorar a responsividade da interface
* Adicionar filtros por data no Front-End
* Permitir edição de registros pela interface
* Melhorar tratamento de erros
* Criar estatísticas de consumo
* Melhorar organização visual dos registros
* Avaliar deploy do Back-End e Front-End
* Evoluir documentação do projeto
* Adicionar testes automatizados futuramente

## Observações

Este projeto está em desenvolvimento contínuo e tem foco educacional, prático e evolutivo.

A proposta é construir uma aplicação simples no início, mas com estrutura suficiente para evoluir gradualmente conforme novos conceitos forem estudados e aplicados.
