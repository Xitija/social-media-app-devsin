import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Landing } from "./pages/Landing/Landing";
import { Authentication } from "./pages/Authentication/Authentication";
import { Profile } from "./pages/Profile/Profile";
import { RequiresAuth } from "./components/Auth/RequiresAuth";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <RequiresAuth>
                <Landing />
              </RequiresAuth>
            }
          />
          {/* TODO: explore can be public */}
          <Route
            path="/explore"
            element={
              <RequiresAuth>
                <Landing />
              </RequiresAuth>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RequiresAuth>
                <Landing />
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
      </div>
    </div>
  );
}

export default App;
