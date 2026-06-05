import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import "../styles/usuarios.css";
import "../styles/modal.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [matricula, setMatricula] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const resposta = await fetch("http://localhost:3000/usuarios");
      const dados = await resposta.json();
      setUsuarios(dados);
    };

    carregarUsuarios();
  }, []);

  async function atualizarTabela() {
    const resposta = await fetch("http://localhost:3000/usuarios");
    const dados = await resposta.json();
    setUsuarios(dados);
  }
  
  async function salvarUsuario() {
    const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        telefone,
        matricula,
      }),
    });
    const dados = await resposta.json();
    console.log(dados);
    await atualizarTabela();
    setMostrarModal(false);

    setNome("");
    setEmail("");
    setTelefone("");
    setMatricula("");
  };

  async function atualizarUsuario() {
    const resposta = await fetch(
      `http://localhost:3000/usuarios/${idUsuario}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          matricula,
        }),
      },
    );

    const dados = await resposta.json();

    console.log(dados);

    await atualizarTabela();

    setMostrarModal(false);

    setModoEdicao(false);

    setIdUsuario(null);

    setNome("");
    setEmail("");
    setTelefone("");
    setMatricula("");
  }

  async function excluirUsuario(id) {
    const confirmar = window.confirm("Deseja realmente excluir este usuário?");
    if (!confirmar) return;
    const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "DELETE",
    });
    const dados = await resposta.json();
    console.log(dados);
    await atualizarTabela();
  }

  //abrir Modal Edição
  function abrirEdicao(usuario) {
    setModoEdicao(true);

    setIdUsuario(usuario.id);

    setNome(usuario.nome);
    setEmail(usuario.email);
    setTelefone(usuario.telefone);
    setMatricula(usuario.matricula);

    setMostrarModal(true);
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Usuários</h1>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => setMostrarModal(true)}
          >
            Novo Usuário
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3
                className="h1"
                onClick={() => {
                  setModoEdicao(false);
                  setIdUsuario(null);
                  setNome("");
                  setEmail("");
                  setTelefone("");
                  setMatricula("");
                  setMostrarModal(true);
                }}
              >
                Novo Usuário
              </h3>
              <input
                className="p-2 border-2 br-2 rounded-3"
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                className="p-2 border-2 rounded-3"
                type="text"
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              <input
                className="p-2 border-2 rounded-3"
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <input
                className="p-2 border-2 rounded-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={modoEdicao ? atualizarUsuario : salvarUsuario}
                >
                  {modoEdicao ? "Salvar Alterações" : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover table-striped aling-middle">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Nome</th>
                  <th className="text-center">Matrícula</th>
                  <th className="text-center">telefone</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Nenhum usuário cadastrado
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="text-center">{usuario.id}</td>
                    <td className="text-center">{usuario.nome}</td>
                    <td className="text-center">{usuario.matricula}</td>
                    <td className="text-center">{usuario.telefone}</td>
                    <td className="text-center">{usuario.email}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => abrirEdicao(usuario)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => excluirUsuario(usuario.id)}
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

export default Usuarios;
