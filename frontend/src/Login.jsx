import { useState } from "react";
import Registration from "./Registration";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch("http://localhost:3005/login", config)
      .then((result) => {
        console.log(result.ok);
        if (result.ok) {
          console.log(result);
          props.setLogin(true);
        } else {
          alert("Invalid password!!");
        }
        return result.json();
      })
      .then((response) => console.log("res--->", response));
  }

  return (
    <div id="loginPage">
      <div className="subLogin">
        <h1>
          Welcome to the{" "}
          <span style={{ fontSize: "50px", fontWeight: 400 }}>L</span>
          <span
            style={{
              fontSize: "45px",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#352f44",
            }}
          >
            ge
          </span>
          <span
            style={{
              color: "#f95959",
              fontSize: 45,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >rm
          </span>
          <span
            style={{
              color: "#f9b248",
              fontSize: 45,
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            an
          </span>{" "}
          page
        </h1>
        <div className="loginForm">
          <h3 className="logInText">Log in to your account</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="inputUserName"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              className="inputPassword"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="login" type="submit">
              Login
            </button>
          </form>
        </div>
        <div>
          <button className="signUp" onClick={() => setShowRegistration(true)}>
            sign up
          </button>
          {showRegistration && <Registration />}
        </div>
      </div>

      <footer>
        <p><b>Can't log in?</b></p>
        <p>Privacy policy Terms of use</p>
      </footer>
    </div>
  );
}
