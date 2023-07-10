import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo.png";

import "./SignUp.css";

export const SignUp = () => {
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
    handle: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signupUser } = useAuth();

  const isEmail = () => {
    if (signup.username.trim().length > 0) {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signup.username);
    } else {
      return true;
    }
  };

  const isPassword = () => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(signup.password) ||
      signup.password.trim() === ""
      ? true
      : false;
  };

  const isHandle = () => {
    if (signup.handle.trim().length > 0) {
      return /^[A-Z0-9]*$/i.test(signup.handle);
    } else {
      return true;
    }
  };

  const passwordsMatch = () => confirmPassword === signup.password;

  const isSubmitReady = () => {
    return (
      signup.password.trim() !== "" &&
      signup.username.trim() !== "" &&
      signup.name.trim() !== "" &&
      signup.handle.trim() !== "" &&
      isEmail() &&
      isPassword() &&
      passwordsMatch()
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signupUser(signup)
  };

  return (
    <>
      <div id="signup-page">
        <form>
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
              <p className="login-text">Sign Up</p>
            </div>
            {/* <hr /> */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={signup.name}
              autoComplete="name"
              onChange={(event) =>
                setSignup({ ...signup, name: event.target.value })
              }
              required
            />
            <label htmlFor="handle">Username</label>
            <input
              type="text"
              id="handle"
              placeholder="Username"
              value={signup.handle}
              autoComplete="username"
              onChange={(event) =>
                setSignup({ ...signup, handle: event.target.value })
              }
              required
            />
            {isHandle() ? (
              ""
            ) : (
              <p className="validation">
                Username can have only alphabets and numbers
              </p>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={signup.username}
              autoComplete="email"
              onChange={(event) =>
                setSignup({ ...signup, username: event.target.value })
              }
              required
            />
            {isEmail() ? (
              ""
            ) : (
              <p className="validation">Please enter valid mail</p>
            )}
            <label htmlFor="password">Password</label>
            <div>
              <input
                style={{ width: "85%" }}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Type Password"
                value={signup.password}
                autoComplete="new-password"
                onChange={(event) =>
                  setSignup({ ...signup, password: event.target.value })
                }
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>
            {isPassword() ? (
              ""
            ) : (
              <p className="validation">
                Password must have minimum eight characters, at least one letter
                and one number
              </p>
            )}
            <label htmlFor="confirm-password">Confirm Password</label>
            <div>
              <input
                style={{ width: "85%" }}
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </span>
            </div>
            {passwordsMatch() ? (
              ""
            ) : (
              <p className="validation">Passwords do not match</p>
            )}
            <button onClick={(e)=>handleSignUp(e)} disabled={!isSubmitReady()}>
              Sign Up
            </button>
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                style={{ textDecoration: "none", color: "#faba14" }}
                to={`/login`}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div>
        <img src={background} className="signup-container" alt="background" />
      </div>
    </>
  );
};
