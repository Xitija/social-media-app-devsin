import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Navigation = () => {
  const { loginUser, logoutUser, setLocation } = useAuth();

  const getActiveStyles = ({ isActive }) => ({
    padding: "1rem",
    color: isActive ? "red" : "orange",
  });

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "0.5px solid",
      }}
    >
      <NavLink style={getActiveStyles} to="/">
        Home
      </NavLink>
      <NavLink style={getActiveStyles} to="/explore">
        Explore
      </NavLink>
      <NavLink style={getActiveStyles} to="/bookmarks">
        Bookmarks
      </NavLink>
      <button onClick={logoutUser}>Logout</button>
    </nav>
  );
};
