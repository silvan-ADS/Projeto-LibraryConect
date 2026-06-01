const express = require("express");

const router = express.Router();

const {
    criarUsuario,
    adicionarUsuarios,
    deletarUsuario
} = require("../controllers/usuariosController");

router.post("/", criarUsuario);
router.get("/", adicionarUsuarios);
router.delete("/:id", deletarUsuario);

module.exports = router;