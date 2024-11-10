# SpotSat Challenge - Backend

Este repositório é o backend para o desafio SpotSat, que oferece manipulação e operações geométricas de polígonos com autenticação de usuário. A aplicação utiliza Node.js, Express, Sequelize e PostGIS para o armazenamento e manipulação de dados geográficos.

## Índice

- [SpotSat Challenge - Backend](#spotsat-challenge---backend)
  - [Índice](#índice)
  - [Configuração Inicial](#configuração-inicial)
    - [Instalação](#instalação)
    - [Configuração do Docker](#configuração-do-docker)
    - [Variáveis de Ambiente](#variáveis-de-ambiente)
    - [Migrações e Seed](#migrações-e-seed)
  - [Iniciar a Aplicação](#iniciar-a-aplicação)
  - [Rotas da API](#rotas-da-api)
    - [Autenticação](#autenticação)
      - [Login de Usuário](#login-de-usuário)
    - [Usuários](#usuários)
      - [Criação de Usuário](#criação-de-usuário)
      - [Listar Todos os Usuários](#listar-todos-os-usuários)
      - [Buscar Usuário por ID](#buscar-usuário-por-id)
      - [Atualizar Usuário](#atualizar-usuário)
      - [Deletar Usuário](#deletar-usuário)
    - [Polígonos](#polígonos)
      - [Criar Polígono](#criar-polígono)
      - [Listar Todos os Polígonos](#listar-todos-os-polígonos)
      - [Buscar Polígono por ID](#buscar-polígono-por-id)
      - [Editar Polígono](#editar-polígono)
      - [Deletar Polígono](#deletar-polígono)
      - [Buscar Polígonos Dentro de um Polígono](#buscar-polígonos-dentro-de-um-polígono)
      - [Buscar Polígonos por Localização e Raio](#buscar-polígonos-por-localização-e-raio)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Contato](#contato)

---

## Configuração Inicial

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/AugustoBuin/SpotSat-Challenge---Backend.git
   cd SpotSat-Challenge---Backend
   ``` 

2. Instale as dependências:
   
   ```bash 
   npm install
   ``` 

### Configuração do Docker
O projeto utiliza um banco de dados PostgreSQL com extensão PostGIS para suporte a dados geográficos. Para facilitar a configuração, utilize o Docker.

Crie um arquivo docker-compose.yml: 

  ```yaml 
  version: '3.8'
services:
  db:
    image: postgis/postgis
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: spotsat
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
  ```

Para inicializar o banco de dados, execute:

  ```bash
  docker-compose up -d
  ```

### Variáveis de Ambiente 
Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias, por exemplo:

  ```plaintext 
  DB_USERNAME=admin
  DB_PASSWORD=password
  DB_NAME=spotsat
  DB_HOST=localhost
  DB_PORT=5432
  JWT_SECRET=sua_chave_secreta
  ```

### Migrações e Seed 
1. Execute as migrações do banco de dados: 
   
  ```bash 
  npm run db:migrate
  ```

2. Opcionalmente, você pode popular o banco com dados de teste:

  ```bash
  npm run db:seed
  ```

## Iniciar a Aplicação
Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Para iniciar a aplicação em produção:

```bash
npm start
```

## Rotas da API 
A seguir estão as rotas da API. Todas as rotas de polígonos exigem autenticação via token JWT.

### Autenticação
#### Login de Usuário
[POST] /login
Autentica o usuário e retorna um token JWT para acessar rotas protegidas.

Corpo da Requisição:

```json
{
  "username": "admin",
  "password": "password"
}
```

Resposta de Sucesso: 

```json
{
  "token": "jwt_token"
}
```

### Usuários 
#### Criação de Usuário
[POST] /users
Cria um novo usuário.

Corpo da Requisição:

```json
{
  "username": "admin",
  "password": "password"
}
```

Resposta de Sucesso:

```json
{
  "message": "Usuário criado com sucesso!"
}
```

#### Listar Todos os Usuários
[GET] /users
Retorna todos os usuários. Necessário autenticação.

Cabeçalho:
Authorization: Bearer {token}

Resposta de Sucesso:

```json
[
  {
    "id": 1,
    "username": "admin",
    "createdAt": "2023-11-10T12:00:00Z",
    "updatedAt": "2023-11-10T12:00:00Z"
  }
]
```

#### Buscar Usuário por ID
[GET] /users/:id
Retorna o usuário pelo ID. Necessário autenticação.

Cabeçalho:
Authorization: Bearer {token}

Resposta de Sucesso:

```json
{
  "id": 1,
  "username": "admin",
  "createdAt": "2023-11-10T12:00:00Z",
  "updatedAt": "2023-11-10T12:00:00Z"
}
```

#### Atualizar Usuário
[PUT] /users/:id
Atualiza o usuário pelo ID. Necessário autenticação.

Cabeçalho:
Authorization: Bearer {token}

Corpo da Requisição:

```json
{
  "username": "admin_updated",
  "password": "nova_senha"
}
```

#### Deletar Usuário
[DELETE] /users/:id
Deleta o usuário pelo ID. Necessário autenticação.

Cabeçalho:
Authorization: Bearer {token}

### Polígonos
#### Criar Polígono
[POST] /polygons
Cria um novo polígono. Necessário autenticação.

Cabeçalho:
Authorization: Bearer {token}

Corpo da Requisição:

```json
{
  "feats": [
    {
      "properties": {
        "name": "Novo Polígono",
        "description": "Descrição opcional"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...]]]
      }
    }
  ]
}
```

Resposta de Sucesso:

```json
{
  "id": 1,
  "name": "Novo Polígono",
  "properties": { "description": "Descrição opcional" },
  "centroid": { "type": "Point", "coordinates": [long, lat] },
  "area": 1000,
  "userId": 1
}
```

#### Listar Todos os Polígonos
[GET] /polygons
Retorna todos os polígonos do usuário autenticado.

Cabeçalho:
Authorization: Bearer {token}

#### Buscar Polígono por ID
[GET] /polygons/:id
Retorna o polígono com o ID especificado.

Cabeçalho:
Authorization: Bearer {token}

#### Editar Polígono
[PUT] /polygons/:id
Edita o polígono com o ID especificado.

Cabeçalho:
Authorization: Bearer {token}

Corpo da Requisição (estrutura semelhante à criação):

```json
{
  "feats": [
    {
      "properties": {
        "name": "Nome Atualizado",
        "description": "Descrição atualizada"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...]]]
      }
    }
  ]
}
```

#### Deletar Polígono
[DELETE] /polygons/:id
Deleta o polígono com o ID especificado.

Cabeçalho:
Authorization: Bearer {token}

#### Buscar Polígonos Dentro de um Polígono
[GET] /polygons/:id/interests
Retorna todos os polígonos que estão dentro do polígono especificado.

Cabeçalho:
Authorization: Bearer {token}

#### Buscar Polígonos por Localização e Raio
[GET] /polygons/search?latitude={latitude}&longitude={longitude}&radius={radius}

Retorna todos os polígonos que estão dentro do raio especificado em metros a partir da localização fornecida.

Parâmetros de Query:

- latitude: Latitude do ponto central.
- longitude: Longitude do ponto central.
- radius: Raio em metros.

Cabeçalho:
Authorization: Bearer {token}

## Tecnologias Utilizadas
- Node.js: Ambiente de execução JavaScript.
- Express: Framework para construção de APIs.
- Sequelize: ORM para manipulação de banco de dados.
- PostgreSQL com PostGIS: Banco de dados relacional com extensão para dados geoespaciais.
- JWT (JSON Web Token): Para autenticação segura.
- Docker: Contêiner para configuração do banco de dados.

## Contato
Para dúvidas ou sugestões, entre em contato com o desenvolvedor.
