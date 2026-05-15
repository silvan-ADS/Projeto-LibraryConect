const livros = require("../models/livroModel");

const listarLivros = (req, res) => {
    res.json(livros)
};

const adicionarLivro = (req, res) => {
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
    id: livros.length + 1,
    titulo,
    autor,
    genero,
    anoPublicacao: anoPublicacaoNumerico,
    quantidade,
    ISBN
  };

  livros.push(novoLivro);

  res.status(201).json({
    mensagem: "Livro adicionado com sucesso!",
    livroAdicionado: novoLivro,
  })
};

module.exports = {
  adicionarLivro,
  listarLivros
};