import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const token = localStorage.getItem("token") ? true : false;

  const [loggedInUser, setLoggedInUser] = useState(user);
  const [isLoggedIn, setIsLoggedIn] = useState(token);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // if (token) {
  //   // setLoggedInUser(JSON.parse(user))
  //   // setIsLoggedIn(true);
  //   navigate("/");
  // }

  const checkUserLogin = () => {
    const user = localStorage.getItem("user");
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      setLoggedInUser(JSON.parse(user));
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  const loginUser = async (username, password) => {
    try {
      const passValue = JSON.stringify({
        username: username,
        password: password,
      });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: passValue,
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", JSON.stringify(data.foundUser));
        setLoggedInUser(data.foundUser);
        setIsLoggedIn(true);
        navigate(location ?? "/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedInUser({});
    setIsLoggedIn(false);
    navigate("/login");
  };

  const value = {
    loggedInUser,
    loginUser,
    logoutUser,
    isLoggedIn,
    setLocation,
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);
