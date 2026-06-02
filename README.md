# Sistema de Gerenciamento de Biblioteca

## Alunos
- Gleyson Tauan Araújo da Silva - 0184950
- José Lucas do Nascimento Ribeiro - 0185989
- Lucas Rafael da Silva Alves - 01849525
- Matheus Lopes Viana Carvalho - 01590039
- Silvan Guilherme de Barros Souza - 01864557


## 1. Tema e Objetivo

O projeto consiste no desenvolvimento de uma aplicação web para o gerenciamento de uma biblioteca escolar ou pública, utilizando Node.js com o framework Express.js.

O objetivo principal é implementar um sistema baseado nas quatro operações fundamentais do CRUD (Create, Read, Update e Delete), permitindo organizar o acervo de livros, gerenciar usuários (leitores) e registrar empréstimos.

---

## 2. Funcionalidades Principais

O sistema será dividido no gerenciamento de três entidades principais:

### Acervo (Livros)

- Cadastrar novos livros:
  - título
  - autor
  - gênero
  - ISBN
  - ano de publicação
  - quantidade disponível

- Listar todos os livros e buscar por título ou autor

- Editar informações de um livro ou atualizar a quantidade em estoque

- Remover livros do sistema (desde que não estejam emprestados)

---

### Leitores (Usuários)

- Cadastrar novos leitores:
  - nome
  - e-mail
  - telefone
  - matrícula

- Listar usuários cadastrados

- Atualizar dados de contato

- Inativar ou remover usuários

---

### Empréstimos

- Registrar empréstimos de livros para leitores

- Registrar devoluções e atualizar o estoque automaticamente

---

## 3. Tecnologias Utilizadas

- Node.js
- Express.js

---

## 4. Estrutura Inicial do Projeto

```txt
src/
├── controllers/
├── models/
├── routes/
└── app.js
