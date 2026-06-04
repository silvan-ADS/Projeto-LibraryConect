import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Livros from "./pages/Livros";
import Emprestimos from "./pages/Emprestimos";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
      </Routes>
  );
}

export default App;