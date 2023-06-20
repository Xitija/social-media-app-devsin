import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Landing } from "./pages/Landing/Landing";
import { Authentication } from "./pages/Authentication/Authentication"; 
import { Bookmarks } from "./pages/Bookmarks/Bookmarks";
import { Profile } from "./pages/Profile/Profile";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Landing />} />
          <Route path="/signup" element={<Authentication/>}/>
          <Route path="/login" element={<Authentication/>}/>
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
