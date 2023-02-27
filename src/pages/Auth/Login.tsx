import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    console.log(user);
  };

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">log in to see your friend's photos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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

        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/login">Sign up </Link>
      </p>
    </div>
  );
};

export default Login;
