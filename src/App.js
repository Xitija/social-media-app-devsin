import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Authentication } from "./pages/Authentication/Authentication";
import { RequiresAuth } from "./components/Auth/RequiresAuth";
import "./App.css";
import { Landing } from "./pages/Landing/Landing";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content">
        {/* <Navigation className="navigation" /> */}
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
            path="/profile/:user"
            element={
              <RequiresAuth>
                <Landing />
              </RequiresAuth>
            }
          />
          <Route
            path="/post-details/:postid"
            element={
              <RequiresAuth>
                <Landing />
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
