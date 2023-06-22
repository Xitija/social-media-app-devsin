import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const checkUserLogin = () => {
    const user =  localStorage.getItem("user");
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      setLoggedInUser(JSON.parse(user))
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
        console.log(location);
        navigate(location);
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
  },[]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export const useAuth = () => useContext(Auth);
