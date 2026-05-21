const supabase = require("../config/supabase");

const listarEmprestimos = async (req, res) => {
  const { data, error } = await supabase.from("emprestimos").select("*");
  
  if (error) {
    return res.status(500).json({
      erro: error.message,
    });
  }

  res.json(data);
};

const criarEmprestimo = async (req, res) => {
  const { id_livro, id_usuario, data_emprestimo, data_devolucao } = req.body;
  
  if (!id_livro || !id_usuario) {
    return res.status(400).json({
      erro: "Livro e usuário são obrigatórios",
    });
  }
  
  // Buscar livro no banco
  const { data: livro, error: erroLivro } = await supabase
  .from("livros")
  .select("*")
    .eq("id", id_livro)
    .single();
    
    if (erroLivro || !livro) {
    return res.status(404).json({
      erro: "Livro não encontrado",
    });
  }
  
  // Verificar quantidade
  if (livro.quantidade <= 0) {
    return res.status(400).json({
      erro: "Livro indisponível",
    });
  }
  
  // Criar empréstimo
  const novoEmprestimo = {
    id_livro,
    id_usuario,
    status: "emprestado"
  };
  
  if (data_emprestimo) {
    novoEmprestimo.data_emprestimo = data_emprestimo
  };

  if (data_devolucao) {
    novoEmprestimo.data_devolucao = data_devolucao
  };
  

  const { data, error } = await supabase
    .from("emprestimos")
    .insert([novoEmprestimo])
    .select();

  if (error) {
    return res.status(500).json({
      erro: error.message,
    });
  }
  
  // Atualizar quantidade do livro
  await supabase
    .from("livros")
    .update({
      quantidade: livro.quantidade - 1,
    })
    .eq("id", id_livro);
    
  res.status(201).json({
    mensagem: "Empréstimo realizado com sucesso",
    emprestimo: data,
  });
};

module.exports = {
  criarEmprestimo,
  listarEmprestimos,
};
