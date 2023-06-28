import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Authentication } from "./pages/Authentication/Authentication";
import { Profile } from "./pages/Profile/Profile";
import { RequiresAuth } from "./components/Auth/RequiresAuth";
import { Navigation } from "./components/Navigation/Navigation";
import { UserSuggestions } from "./components/UserSuggestions/UserSuggestions";
import "./App.css";
import { Bookmarks } from "./components/Bookmarks/Bookmarks";
import { Explore } from "./components/Explore/Explore";
import { HomePage } from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content" style={{display:"flex"}}>
      <Navigation />  
        <Routes>
          <Route
            path="/"
            element={
              <RequiresAuth>
                <HomePage />
              </RequiresAuth>
            }
          />
          {/* TODO: explore can be public */}
          <Route
            path="/explore"
            element={
              <RequiresAuth>
                <Explore />
              </RequiresAuth>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RequiresAuth>
                <Bookmarks />
              </RequiresAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="/signup" element={<Authentication />} />
          <Route path="/login" element={<Authentication />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        <UserSuggestions />
      </div>
    </div>
  );
}

export default App;
