import { useLocation } from "react-router-dom";

import { Navigation } from "../../components/Navigation/Navigation";
import { HomePage } from "../../components/HomePage/HomePage";
import { Explore } from "../../components/Explore/Explore";
import { UserSuggestions } from "../../components/UserSuggestions/UserSuggestions";
import { Bookmarks } from "../../components/Bookmarks/Bookmarks";

export const Landing = () => {
  const location = useLocation();

  const getViewComponent = () => {
    if(location.pathname === "/")
      return <HomePage />;
    if(location.pathname === "/explore")
      return <Explore />
    if(location.pathname === "/bookmarks")
      return <Bookmarks/>
  }
  
  return (
    <div style={{ display: "flex" }}>
      <Navigation />  
      {/* Pos fixed , sticky */}
      <div style={{borderRight : "0.5px solid"}}>{getViewComponent()}</div>
      {/*  overflow-y :scroll */}
      <UserSuggestions />
    </div>
  );
};
