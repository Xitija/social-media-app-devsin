import { useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo.png";

import "./Login.css";

export const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const { loginUser, logoutUser, setLocation } = useAuth();

  const location = useLocation();

  const isEmail = (email) => {
    if (email.trim().length > 0) {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    } else {
      return true;
    }
  };

  const isPassword = (password) => {
    return password.trim().length >= 5 || password.trim() === "" ? true : false;
  };

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

  const isEmailValid = isEmail(login.email);
  const isPasswordValid = isPassword(login.password);

  return (
    <>
      <div id="page-wrap">
        <div className="login-content">
          <div style={{ display: "flex ", flexDirection: "column" }}>
            <div className="logo-container">
              <img
                style={{ width: "10%", backgroundColor: "black" }}
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
        </div>
      </div>
      <div>
        <img src={background} className="login-container" />
      </div>
    </>
  );
};
