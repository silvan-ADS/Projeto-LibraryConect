const express = require("express");

const router = express.Router();

const {
    criarUsuario,
    adicionarUsuarios
} = require("../controllers/usuariosController");

router.post("/", criarUsuario);
router.get("/", adicionarUsuarios);

module.exports = router;