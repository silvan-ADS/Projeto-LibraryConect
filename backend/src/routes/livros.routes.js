const express = require("express");

const router = express.Router();

const {
  listarLivros,
  adicionarLivro,
  deletarLivro,
} = require("../controllers/livrosController");

router.post("/", adicionarLivro);
router.get("/", listarLivros);
router.delete("/:id", deletarLivro);

module.exports = router;
