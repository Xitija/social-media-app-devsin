import { useLocation } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { SignUp } from "../../components/SignUp/SignUp";

export const Authentication = () => {
  const location = useLocation();

  return (
    <div style={{ borderRight: "0.5px solid" }}>
      {location.pathname === "/login" ? <Login /> : <SignUp />}
    </div>
  );
};
