import { useLocation } from "react-router-dom";

import { Navigation } from "../../components/Navigation/Navigation";
import { HomePage } from "../../components/HomePage/HomePage";
import { Explore } from "../../components/Explore/Explore";
import { UserSuggestions } from "../../components/UserSuggestions/UserSuggestions";
import { Bookmarks } from "../../components/Bookmarks/Bookmarks";
import { Profile } from "../Profile/Profile";
import { PostDetail } from "../../components/PostDetail/PostDetail";

import "./Landing.css";

export const Landing = () => {
  const location = useLocation();

  const getViewComponent = () => {
    if (location.pathname === "/") return <HomePage />;
    if (location.pathname === "/explore") return <Explore />;
    if (location.pathname === "/bookmarks") return <Bookmarks />;
    if (location.pathname.toLowerCase().includes("profile")) return <Profile />;
    if (location.pathname.toLowerCase().includes("post-details"))
      return <PostDetail />;
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Navigation />
      <div className="center-section">{getViewComponent()}</div>
      <UserSuggestions />
    </div>
  );
};
