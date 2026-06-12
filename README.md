# Sistema de Gerenciamento de Biblioteca - LibraryConnect

## Integrantes

* Gleyson Tauan Araújo da Silva - 01849450
* José Lucas do Nascimento Ribeiro - 01859589
* Lucas Rafael da Silva Alves - 01849525
* Matheus Lopes Viana Carvalho - 01590039
* Silvan Guilherme de Barros Souza - 01864557

---

# 1. Sobre o Projeto

O LibraryConnect é uma aplicação web desenvolvida para gerenciamento de bibliotecas escolares ou públicas.

O sistema permite controlar o acervo de livros, o cadastro de usuários e o gerenciamento de empréstimos através de uma interface web integrada a uma API REST.

O projeto foi desenvolvido como atividade da disciplina de Backend Framework.

---

# 2. Funcionalidades

## Autenticação

* Login de usuários utilizando autenticação nativa do Supabase.
* Controle de acesso ao sistema.

## Usuários

* Cadastrar usuários.
* Listar usuários cadastrados.
* Editar informações dos usuários.
* Excluir usuários.

## Livros

* Cadastrar livros.
* Listar livros disponíveis.
* Atualizar informações dos livros.
* Excluir livros.
* Controle de quantidade em estoque.

## Empréstimos

* Registrar empréstimos.
* Registrar devoluções.
* Atualizar empréstimos.
* Excluir empréstimos.
* Atualização automática da quantidade disponível dos livros.

---

# 3. Tecnologias Utilizadas

## Frontend

* React
* Vite
* Bootstrap
* React Router DOM
* React Icons

## Backend

* Node.js
* Express.js
* Cors
* Dotenv

## Banco de Dados

* Supabase
* PostgreSQL

## Controle de Versão

* Git
* GitHub

---

# 4. Arquitetura do Sistema

```txt
Frontend (React + Vite)
          ↓
API REST (Node.js + Express)
          ↓
Banco de Dados (Supabase/PostgreSQL)
```

---

# 5. Estrutura do Projeto

```txt
frontend/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── .env

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── package.json
└── .env
```

---

# 6. Como Executar o Projeto

## Pré-requisitos

* Node.js instalado
* NPM instalado
* Projeto Supabase configurado

---

## Backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz da pasta backend:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

Execute o servidor:

```bash
npm run dev
```

O backend será iniciado em:

```txt
http://localhost:3000
```

---

## Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz da pasta frontend:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

Execute o projeto:

```bash
npm run dev
```

O frontend será iniciado em:

```txt
http://localhost:5173
```

---

# 7. Variáveis de Ambiente

O projeto utiliza dois arquivos `.env` distintos:

## Backend

Responsável pela comunicação com o banco de dados.

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

As variáveis são acessadas através de:

```javascript
process.env.SUPABASE_URL
process.env.SUPABASE_KEY
```

---

## Frontend

Responsável pela autenticação e integração com o Supabase.

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

As variáveis são acessadas através de:

```javascript
import.meta.env.VITE_SUPABASE_URL
import.meta.env.VITE_SUPABASE_ANON_KEY
```

Por utilizar o Vite, todas as variáveis disponíveis no frontend devem possuir o prefixo `VITE_`.

---

# 8. Observações

Os arquivos `.env` não são enviados ao repositório GitHub por questões de segurança.

Para executar o projeto localmente é necessário criar os arquivos `.env` do frontend e backend com credenciais válidas do Supabase.

---

# 9. Resultado

O sistema implementa com sucesso:

* Autenticação de usuários.
* CRUD completo de Usuários.
* CRUD completo de Livros.
* CRUD completo de Empréstimos.
* Integração entre Frontend, Backend e Banco de Dados.
* Persistência de dados em nuvem utilizando Supabase.

O projeto demonstra a aplicação prática dos conceitos de APIs REST, CRUD, autenticação, integração com banco de dados e desenvolvimento full stack utilizando tecnologias modernas do ecossistema JavaScript.
