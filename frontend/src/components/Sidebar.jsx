import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-primary text-white p-4"
      style={{
        width: "220px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-5">LibraryConnect</h3>

      <div className="d-flex flex-column gap-3">
        <Link className="text-white text-decoration-none" to="/usuarios">
          Usuários
        </Link>

        <Link className="text-white text-decoration-none" to="/livros">
          Livros
        </Link>

        <Link className="text-white text-decoration-none" to="/emprestimos">
          Empréstimos
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
