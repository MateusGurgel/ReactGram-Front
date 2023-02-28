import "./Auth.css";

import { Link } from "react-router-dom";

import { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { register, reset } from "../../slices/authSlice";
import { store } from "../../store";
import Message from "../../components/Message/Message";



const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispath = useDispatch()

  const {loading, error, status} = useSelector((state : any) => state.auth );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    
    store.dispatch(register(user))
  };

  useEffect(() => {
    dispath(reset());
  }, [dispath])

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirme a senha"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        
        <input type="submit" value="Register" disabled={loading} />
        {error && <Message message={status} type="error"/>}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
