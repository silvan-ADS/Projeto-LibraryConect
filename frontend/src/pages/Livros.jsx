import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import "../styles/usuarios.css";
import "../styles/modal.css";

function Livros() {
  const [livros, setLivros] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [ISBN, setISBN] = useState("");

  const [modoEdicao, setModoEdicao] = useState(false);
  const [idLivro, setIdLivro] = useState(null);

  async function atualizarTabela() {
    const resposta = await fetch("http://localhost:3000/livros");
    const dados = await resposta.json();
    setLivros(dados);
  }

  useEffect(() => {
    async function carregarLivros() {
      const resposta = await fetch("http://localhost:3000/livros");
      const dados = await resposta.json();
      setLivros(dados);
    }

    carregarLivros();
  }, []);

  async function salvarLivro() {
    const resposta = await fetch("http://localhost:3000/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        autor,
        genero,
        anoPublicacao,
        quantidade,
        ISBN,
      }),
    });

    const dados = await resposta.json();

    console.log(dados);

    await atualizarTabela();

    limparFormulario();

    setMostrarModal(false);
  }

  async function atualizarLivro() {
    const resposta = await fetch(
      `http://localhost:3000/livros/${idLivro}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          autor,
          genero,
          anoPublicacao,
          quantidade,
          ISBN,
        }),
      }
    );

    const dados = await resposta.json();

    console.log(dados);

    await atualizarTabela();

    limparFormulario();

    setModoEdicao(false);

    setMostrarModal(false);
  }

  async function excluirLivro(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este livro?"
    );

    if (!confirmar) return;

    const resposta = await fetch(
      `http://localhost:3000/livros/${id}`,
      {
        method: "DELETE",
      }
    );

    const dados = await resposta.json();

    console.log(dados);

    await atualizarTabela();
  }

  function abrirEdicao(livro) {
    setModoEdicao(true);

    setIdLivro(livro.id);

    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setAnoPublicacao(livro.anoPublicacao);
    setQuantidade(livro.quantidade);
    setISBN(livro.ISBN);

    setMostrarModal(true);
  }

  function limparFormulario() {
    setTitulo("");
    setAutor("");
    setGenero("");
    setAnoPublicacao("");
    setQuantidade("");
    setISBN("");

    setIdLivro(null);
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Livros</h1>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              limparFormulario();

              setModoEdicao(false);

              setMostrarModal(true);
            }}
          >
            Novo Livro
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>
                {modoEdicao
                  ? "Editar Livro"
                  : "Novo Livro"}
              </h3>

              <input
                className="form-control mb-2"
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) =>
                  setTitulo(e.target.value)
                }
              />

              <input
                className="form-control mb-2"
                type="text"
                placeholder="Autor"
                value={autor}
                onChange={(e) =>
                  setAutor(e.target.value)
                }
              />

              <input
                className="form-control mb-2"
                type="text"
                placeholder="Gênero"
                value={genero}
                onChange={(e) =>
                  setGenero(e.target.value)
                }
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Ano de Publicação"
                value={anoPublicacao}
                onChange={(e) =>
                  setAnoPublicacao(e.target.value)
                }
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) =>
                  setQuantidade(e.target.value)
                }
              />

              <input
                className="form-control mb-2"
                type="text"
                placeholder="ISBN"
                value={ISBN}
                onChange={(e) =>
                  setISBN(e.target.value)
                }
              />

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setMostrarModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  className="btn btn-primary"
                  onClick={
                    modoEdicao
                      ? atualizarLivro
                      : salvarLivro
                  }
                >
                  {modoEdicao
                    ? "Salvar Alterações"
                    : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Gênero</th>
                  <th>Ano</th>
                  <th>Quantidade</th>
                  <th>ISBN</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {livros.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center"
                    >
                      Nenhum livro cadastrado
                    </td>
                  </tr>
                ) : (
                  livros.map((livro) => (
                    <tr key={livro.id}>
                      <td>{livro.id}</td>
                      <td>{livro.titulo}</td>
                      <td>{livro.autor}</td>
                      <td>{livro.genero}</td>
                      <td>{livro.anoPublicacao}</td>
                      <td>{livro.quantidade}</td>
                      <td>{livro.ISBN}</td>

                      <td>
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() =>
                            abrirEdicao(livro)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            excluirLivro(livro.id)
                          }
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Livros;