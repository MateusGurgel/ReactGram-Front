import { FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import { login, reset } from "../../slices/authSlice";
import { store } from "../../store";
import "./Auth.css";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");


  const dispath = useDispatch()
  const {loading, error, status} = useSelector((state : any) => state.auth );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    store.dispatch(login(user))
  };

  useEffect(() => {
    dispath(reset());
  }, [dispath])

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">log in to see your friend's photos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Name"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input type="submit" disabled={loading} value="Login" />
        {error && <Message message={status} type="error"/>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up </Link>
      </p>
    </div>
  );
};

export default Login;
