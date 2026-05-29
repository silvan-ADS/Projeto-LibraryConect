import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [mensagemErro, setMensagemErro] = useState("");

  async function fazerLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setMensagemErro(error.message);
      return;
    }

    setMensagemErro("");

    alert("Login realizado com sucesso!");

    console.log(data);
  }

  async function cadastrarUsuario() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

   if (error) {
     setMensagemErro(error.message);
     return;
   }

   setMensagemErro("Usuário cadastrado com sucesso!");

    console.log(data);
  }

  return (
    <div className="login-container">
      <h1>Acesso ao Sistema</h1>

      <input
        type="email"
        id="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        id="senha"
        placeholder="Digite sua senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <p id="mensagemErro">{mensagemErro}</p>

      <button onClick={fazerLogin} className="entrar">Entrar</button>

      <button onClick={cadastrarUsuario}>Cadastrar</button>
    </div>
  );
}

export default Login;
