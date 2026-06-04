import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [tipoMensagem, setTipoMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem("logado");
    if (logado) {
      navigate("/usuarios");
    }
  }, [navigate]);

  async function fazerLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        setMensagem("Email ou senha inválidos");
      } else {
        setMensagem("Erro ao fazer login");
      }

      setTipoMensagem("erro");
      return;
    }

    localStorage.setItem("logado", "true");

    localStorage.setItem("usuario", JSON.stringify(data.user));

    setMensagem("Login realizado com sucesso!");
    setTipoMensagem("sucesso");

    navigate("/usuarios");
  }

  async function cadastrarUsuario() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      if (error.message === "User already registered") {
        setMensagem("Usuário já cadastrado");
      } else if (error.message.includes("Password")) {
        setMensagem("A senha deve ter pelo menos 6 caracteres");
      } else {
        setMensagem("Erro ao cadastrar usuário");
      }

      setTipoMensagem("erro");
      return;
    }

    setMensagem("Cadastro realizado. Verifique seu e-mail caso seja necessária confirmação.");
    setTipoMensagem("sucesso");

    console.log(data);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Acesso ao Sistema</h1>
        <div className="input-group">
          <HiOutlineMail />
          <input
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <HiOutlineLockClosed />
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </button>
        </div>
        <button className="btn-login" onClick={fazerLogin}>
          Entrar
        </button>
        <button className="btn-cadastro" onClick={cadastrarUsuario}>
          Cadastrar
        </button>
        {mensagem && <p className={`mensagem ${tipoMensagem}`}>{mensagem}</p>}
      </div>
    </div>
  );
}

export default Login;
