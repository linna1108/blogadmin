
import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { Context } from "../../context/authContext/Context";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <span className="loginTitle">Login Admin</span>
      <form className="loginForm" >
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
         onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin} disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
}
