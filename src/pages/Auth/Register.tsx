import "./Auth.css"

import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form>
        <input
          type="text"
          placeholder="Nome"
        />
        <input
          type="email"
          placeholder="E-mail"
        />
        <input
          type="password"
          placeholder="Senha"
        />
        <input
          type="password"
          placeholder="Confirme a senha"
        />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  )
}

export default Register