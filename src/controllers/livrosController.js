const supabase = require("../config/supabase");

const listarLivros = async (req, res) => {
  const { data, error } = await supabase.from("livros").select("*");

  if (error) {
    return res.status(500).json({
      erro: error.message,
    })
  };

  res.json(data);
};

const adicionarLivro = async (req, res) => {
  const { titulo, autor, genero, anoPublicacao, quantidade, ISBN } = req.body;
  const anoPublicacaoNumerico = Number(anoPublicacao);

  if (!titulo || !autor) {
    return res.status(400).json({
      erro: "Atenção: O título e o autor do livro são obrigatórios!",
    })
  };

  if (!Number.isInteger(anoPublicacaoNumerico)) {
    return res.status(400).json({
      erro: "Atenção: o ano de publicação deve ser um número inteiro válido.",
    });
  }

  const novoLivro = {
    titulo,
    autor,
    genero,
    anoPublicacao: anoPublicacaoNumerico,
    quantidade,
    ISBN,
  };

  const { data, error } = await supabase
    .from("livros")
    .insert([novoLivro])
    .select();

  if (error) {
    return res.status(500).json({
      erro: error.message,
    })
  };

  res.status(201).json({
    mensagem: "Livro adicionado com sucesso!",
    livroAdicionado: data,
  });
};

module.exports = {
  adicionarLivro,
  listarLivros,
};
