import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "../styles/sidebar.css";
import "../styles/usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await fetch("http://localhost:3000/usuarios");
      const dados = await resposta.json();
      setUsuarios(dados);
    }

    buscarUsuarios();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Usuários</h1>

          <button className="btn btn-primary btn-lg">Novo Usuário</button>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-hover table-striped aling-middle">
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Nome</th>
                  <th className="text-center">Matrícula</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="text-center">{usuario.id}</td>
                    <td className="text-center">{usuario.nome}</td>
                    <td className="text-center">{usuario.matricula}</td>
                    <td className="text-center">{usuario.email}</td>

                    <td className="text-center">
                      <button className="btn btn-secondary btn-sm me-2">
                        <FaEdit />
                      </button>

                      <button className="btn btn-danger btn-sm">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
