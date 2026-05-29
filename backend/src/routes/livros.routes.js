const express = require("express");

const router = express.Router();

const {
  listarLivros,
  adicionarLivro
} = require("../controllers/livrosController");

router.post("/", adicionarLivro);
router.get("/", listarLivros);

module.exports = router;
