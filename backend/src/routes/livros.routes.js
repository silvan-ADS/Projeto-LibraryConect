const express = require("express");

const router = express.Router();

const {
  listarLivros,
  adicionarLivro,
  atualizarLivro,
  deletarLivro,
} = require("../controllers/livrosController");

router.post("/", adicionarLivro);
router.get("/", listarLivros);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

module.exports = router;
