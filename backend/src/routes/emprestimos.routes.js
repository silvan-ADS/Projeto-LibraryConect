const express =  require("express");

const router = express.Router();

const {
    listarEmprestimos,
    criarEmprestimo
} = require("../controllers/emprestimosController");

router.get("/", listarEmprestimos);
router.post("/", criarEmprestimo);

module.exports = router;