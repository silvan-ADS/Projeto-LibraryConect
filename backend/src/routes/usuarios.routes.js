const express = require("express");

const router = express.Router();

const {
    criarUsuario,
    adicionarUsuarios,
    deletarUsuario,
    atualizarUsuario
} = require("../controllers/usuariosController");

router.post("/", criarUsuario);
router.get("/", adicionarUsuarios);
router.delete("/:id", deletarUsuario);
router.put("/:id", atualizarUsuario);

module.exports = router;