const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './Database/Database.env' });

// Inicializando o cliente do Supabase com as variáveis do .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function inserirLivro() {
  console.log("Tentando conectar com o Supabase...");

  // Inserindo um novo registro na tabela 'livros'
  const { data, error } = await supabase
    .from('Livro')
    .insert([
      { 
        titulo: 'O Programador Pragmático', 
        autor: 'Andrew Hunt', 
        anoPublicacao: 1990, 
        genero: 'Tecnologia', 
        quantidade: 5, 
        ISBN: '9780201616224' 
      }
    ])
    .select(); // O .select() no final pede para o banco devolver o dado que acabou de ser inserido

  // Tratamento de erro básico
  if (error) {
    console.error("❌ Erro ao inserir no banco:", error.message);
    return;
  }

  console.log("✅ Livro inserido com sucesso! Aqui estão os dados:", data);
}

inserirLivro();