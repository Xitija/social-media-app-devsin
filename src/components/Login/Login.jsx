import { useLocation, Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo.png";

import "./Login.css";

export const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const { loginUser, setLocation } = useAuth();

  const location = useLocation();

  const isSubmitReady = () => {
    return login.password.trim() !== "" && login.email.trim() !== "";
  };

  const handleLogin = (mode) => {
    if (mode === "GUEST") {
      loginUser("adarshbalika@gmail.com", "adarshBalika123");
    } else {
      loginUser(login.email, login.password);
    }
    setLocation(location?.state?.from?.pathname);
  };

  return (
    <>
      <div id="page-wrap">
        <div className="login-content">
          <div style={{ display: "flex ", flexDirection: "column" }}>
            <div className="logo-container">
              <img
                style={{ width: "12%", backgroundColor: "black" }}
                src={logo}
                alt="DevsIn_logo"
              />
              <p className="logo-title">DevsIn</p>
            </div>
            <p className="login-text">Login</p>
          </div>
          {/* <hr /> */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={login.email}
            onChange={(event) =>
              setLogin({ ...login, email: event.target.value })
            }
            required
          />
          {/* {isEmail(login.email) ? "" : <p>Please enter valid mail</p>} */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Shh...."
            value={login.password}
            onChange={(event) =>
              setLogin({ ...login, password: event.target.value })
            }
          />
          {/* {isPassword(login.password) ? (
            ""
          ) : (
            <p>Please enter atleast 5 characters</p>
          )} */}
          <button onClick={handleLogin} disabled={!isSubmitReady()}>
            Login
          </button>
          <button onClick={() => handleLogin("GUEST")}>Login Guest</button>
          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              style={{ textDecoration: "none", color: "#faba14" }}
              to={`/signup`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div>
        <img src={background} className="login-container" alt="background" />
      </div>
    </>
  );
};
