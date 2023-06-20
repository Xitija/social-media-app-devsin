import { useLocation } from "react-router-dom";

import { Navigation } from "../../components/Navigation/Navigation";
import { HomePage } from "../../components/HomePage/HomePage";
import { Explore } from "../../components/Explore/Explore";
import { UserSuggestions } from "../../components/UserSuggestions/UserSuggestions";

export const Landing = () => {
  const location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <Navigation />
      <div style={{borderRight : "0.5px solid"}}>{location.pathname === "/" ? <HomePage /> : <Explore />}</div>
      <UserSuggestions />
    </div>
  );
};
