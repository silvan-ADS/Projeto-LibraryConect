const express =  require("express");

const router = express.Router();

const {
    listarEmprestimos,
    criarEmprestimo,
    atualizarEmprestimo
} = require("../controllers/emprestimosController");

router.get("/", listarEmprestimos);
router.post("/", criarEmprestimo);
router.put("/:id", atualizarEmprestimo);

module.exports = router;