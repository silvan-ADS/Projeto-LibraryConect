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

  let quantidadeFinal = 0;

  //Validação de quantidade ( >=0 e número inteiro)
  if (quantidade !== undefined && quantidade !== null) {
    quantidadeFinal = Number(quantidade);

    if (isNaN(quantidadeFinal) || quantidadeFinal < 0) {
      return res.status(400).json({
        erro: "Atenção: A quantidade deve ser um número inteiro positivo!",
      });
    }
  }

  let anoPublicacaoFinal = anoPublicacao;

  //Validação de ano de publicação (não pode ser no futuro)
  if (anoPublicacao !== undefined && anoPublicacao !== null) {
    anoPublicacaoFinal = Number(anoPublicacao);
    const anoAtual = new Date().getFullYear();

    if (isNaN(anoPublicacaoFinal) || anoPublicacaoFinal > anoAtual) {
      return res.status(400).json({
        erro: "Atenção: O ano de publicação não pode ser no futuro!",
      });
    }
  }

  let isbnLimpo = null;

  //Validação e Verificação de Duplicidade do ISBN
  if (ISBN) {
    isbnLimpo = ISBN.replace(/-/g, "");

    if (isbnLimpo.length !== 10 && isbnLimpo.length !== 13) {
      return res.status(400).json({
        erro: "Atenção: O ISBN deve conter 10 ou 13 dígitos (sem hífens)!",
      });
    }

    //busca no banco de dados se já existe um livro com o mesmo ISBN
    const { data: livrosExistentes, error: erroBusca } = await supabase
      .from("livros")
      .select("id")
      .eq("ISBN", isbnLimpo)
      .maybeSingle();

    if (erroBusca) {
      return res.status(500).json({
        erro: erroBusca.message,
      });
    }

    if (livrosExistentes) {
      return res.status(400).json({
        erro: "Atenção: Já existe um livro cadastrado com este ISBN!",
      });
    }
  }

  //Montagem do objeto final padronizado para inserção no banco de dados
  const novoLivro = {
    titulo,
    autor,
    genero: genero || "sem classificação", // Define um valor padrão para gênero vazio
    anoPublicacao: anoPublicacaoFinal,
    quantidade: quantidadeFinal,
    ISBN: isbnLimpo, // Define ISBN como null se não for fornecido
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

const deletarLivro = async (req, res) => {
  const { id } = req.params;
  const livroId = Number(id);

  if (!id || Number.isNaN(livroId)) {
    return res.status(400).json({
      erro: "Atenção: ID do livro inválido.",
    });
  }

  const { data: livroExistente, error: erroBusca } = await supabase
    .from("livros")
    .select("id")
    .eq("id", livroId)
    .maybeSingle();

  if (erroBusca) {
    return res.status(500).json({
      erro: erroBusca.message,
    });
  }

  if (!livroExistente) {
    return res.status(404).json({
      erro: "Livro não encontrado.",
    });
  }

  const { error } = await supabase
    .from("livros")
    .delete()
    .eq("id", livroId);

  if (error) {
    return res.status(500).json({
      erro: error.message,
    });
  }

  res.json({
    mensagem: "Livro excluído com sucesso!",
  });
};

module.exports = {
  adicionarLivro,
  listarLivros,
  deletarLivro,
};
