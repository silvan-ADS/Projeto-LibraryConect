const express =  require("express");

const router = express.Router();

const {
    listarEmprestimos,
    criarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
} = require("../controllers/emprestimosController");

router.get("/", listarEmprestimos);
router.post("/", criarEmprestimo);
router.put("/:id", atualizarEmprestimo);
router.delete("/:id", deletarEmprestimo);

module.exports = router;