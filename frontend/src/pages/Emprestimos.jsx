import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import "../styles/usuarios.css";
import "../styles/modal.css";

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [idLivro, setIdLivro] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [status, setStatus] = useState("emprestado");

  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEmprestimo, setIdEmprestimo] = useState(null);

  const carregarDados = async () => {
    const [resEmprestimos, resLivros, resUsuarios] =
      await Promise.all([
        fetch("http://localhost:3000/emprestimos"),
        fetch("http://localhost:3000/livros"),
        fetch("http://localhost:3000/usuarios"),
      ]);

    const emprestimosData = await resEmprestimos.json();
    const livrosData = await resLivros.json();
    const usuariosData = await resUsuarios.json();

    setEmprestimos(emprestimosData);
    setLivros(livrosData);
    setUsuarios(usuariosData);
  };

  useEffect(() => {
    async function inicializar() {
      await carregarDados();
    }

    inicializar();
  }, []);

  async function salvarEmprestimo() {
    const resposta = await fetch(
      "http://localhost:3000/emprestimos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_livro: Number(idLivro),
          id_usuario: Number(idUsuario),
          data_devolucao: dataDevolucao,
        }),
      }
    );

    const dados = await resposta.json();

    console.log(dados);

    await carregarDados();

    setMostrarModal(false);

    limparFormulario();
  }

  async function atualizarEmprestimo() {
    const resposta = await fetch(
      `http://localhost:3000/emprestimos/${idEmprestimo}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data_devolucao: dataDevolucao,
          status,
        }),
      }
    );

    const dados = await resposta.json();

    console.log(dados);

    await carregarDados();

    setMostrarModal(false);

    limparFormulario();
  }

  async function excluirEmprestimo(id) {
    const confirmar = window.confirm(
      "Deseja excluir este empréstimo?"
    );

    if (!confirmar) return;

    const resposta = await fetch(
      `http://localhost:3000/emprestimos/${id}`,
      {
        method: "DELETE",
      }
    );

    const dados = await resposta.json();

    console.log(dados);

    await carregarDados();
  }

  function abrirEdicao(emprestimo) {
    setModoEdicao(true);

    setIdEmprestimo(emprestimo.id);
    setIdLivro(emprestimo.id_livro);
    setIdUsuario(emprestimo.id_usuario);

    setDataDevolucao(
      emprestimo.data_devolucao
        ? emprestimo.data_devolucao.split("T")[0]
        : ""
    );

    setStatus(emprestimo.status);

    setMostrarModal(true);
  }

  function limparFormulario() {
    setIdLivro("");
    setIdUsuario("");
    setDataDevolucao("");
    setStatus("emprestado");

    setModoEdicao(false);
    setIdEmprestimo(null);
  }

  function nomeLivro(id) {
    const livro = livros.find((l) => l.id === id);
    return livro ? livro.titulo : id;
  }

  function nomeUsuario(id) {
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? usuario.nome : id;
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Empréstimos</h1>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              limparFormulario();
              setMostrarModal(true);
            }}
          >
            Novo Empréstimo
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>
                {modoEdicao
                  ? "Editar Empréstimo"
                  : "Novo Empréstimo"}
              </h3>

              <select
                className="form-select mb-2"
                value={idLivro}
                onChange={(e) => setIdLivro(e.target.value)}
                disabled={modoEdicao}
              >
                <option value="">
                  Selecione um livro
                </option>

                {livros.map((livro) => (
                  <option
                    key={livro.id}
                    value={livro.id}
                  >
                    {livro.titulo}
                  </option>
                ))}
              </select>

              <select
                className="form-select mb-2"
                value={idUsuario}
                onChange={(e) =>
                  setIdUsuario(e.target.value)
                }
                disabled={modoEdicao}
              >
                <option value="">
                  Selecione um usuário
                </option>

                {usuarios.map((usuario) => (
                  <option
                    key={usuario.id}
                    value={usuario.id}
                  >
                    {usuario.nome}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="form-control mb-2"
                value={dataDevolucao}
                onChange={(e) =>
                  setDataDevolucao(e.target.value)
                }
              />

              <select
                className="form-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="emprestado">
                  Emprestado
                </option>

                <option value="devolvido">
                  Devolvido
                </option>
              </select>

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
                      ? atualizarEmprestimo
                      : salvarEmprestimo
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
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Livro</th>
                  <th>Usuário</th>
                  <th>Data Empréstimo</th>
                  <th>Data Devolução</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {emprestimos.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      Nenhum empréstimo encontrado
                    </td>
                  </tr>
                ) : (
                  emprestimos.map((emprestimo) => (
                    <tr key={emprestimo.id}>
                      <td>{emprestimo.id}</td>

                      <td>
                        {nomeLivro(
                          emprestimo.id_livro
                        )}
                      </td>

                      <td>
                        {nomeUsuario(
                          emprestimo.id_usuario
                        )}
                      </td>

                      <td>
                        {emprestimo.data_emprestimo
                          ?.split("T")[0]}
                      </td>

                      <td>
                        {emprestimo.data_devolucao
                          ?.split("T")[0]}
                      </td>

                      <td>{emprestimo.status}</td>

                      <td>
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() =>
                            abrirEdicao(emprestimo)
                          }
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            excluirEmprestimo(
                              emprestimo.id
                            )
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

export default Emprestimos;