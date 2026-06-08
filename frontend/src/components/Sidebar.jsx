import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { FaUsers, FaBook, FaExchangeAlt } from "react-icons/fa";
import Logo from "../assets/libraryAzul-conectBranco.png"
import "../styles/sidebar.css"

function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuario");

    navigate("/");
  }

  return (
    <div
      className="bg-primary text-white p-4 d-flex flex-column sidebar"
      style={{
        width: "240px",
        minHeight: "100vh",
      }}
    >
      <div className="mb-5 text-center cont-logo">
        <img
          src={Logo}
          alt="Library Connect"
          className="img-fluid"
          style={{
            maxWidth: "200px",
          }}
        />
      </div>

      <div className="d-flex flex-column gap-2">
        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `text-decoration-none p-3 rounded ${
              isActive ? "bg-light text-primary fw-bold" : "text-white"
            }`
          }
        >
          <FaUsers className="me-2" /> Usuários
        </NavLink>
        <NavLink
          to="/livros"
          className={({ isActive }) =>
            `text-decoration-none p-3 rounded ${
              isActive ? "bg-light text-primary fw-bold" : "text-white"
            }`
          }
        >
          <FaBook className="me-2" /> Livros
        </NavLink>
        <NavLink
          to="/emprestimos"
          className={({ isActive }) =>
            `text-decoration-none p-3 rounded ${
              isActive ? "bg-light text-primary fw-bold" : "text-white"
            }`
          }
        >
          <FaExchangeAlt className="me-2"/> Empréstimos
        </NavLink>
      </div>

      <button
        className="btn btn-lg btn-light d-flex align-items-center gap-2 mt-auto p-3"
        onClick={logout}
      >
        <FiLogOut />
        Sair
      </button>
    </div>
  );
}

export default Sidebar;
