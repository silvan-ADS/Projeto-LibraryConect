const express = require("express");

const usuariosRoutes = require("./routes/usuarios.routes");

const rotasDeLivros = require('./routes/livros.routes');

const emprestimosRouter = require("./routes/emprestimos.routes");

const app = express();

app.use(express.json());

app.use("/livros", rotasDeLivros);
app.use("/usuarios", usuariosRoutes);
app.use("/emprestimos", emprestimosRouter);

module.exports = app;
