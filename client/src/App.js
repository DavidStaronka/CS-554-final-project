//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "../src/components/Home";
import Profile from "../src/components/Profile";
import CharacterList from "../src/components/CharacterList";
import SessionList from "../src/components/SessionList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DnD App</h1>
          <nav>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
            <NavLink className="navlink" to="/profile">
              Profile
            </NavLink>
            <NavLink className="navlink" to="/characters">
              Characters
            </NavLink>
            <NavLink className="navlink" to="/sessions">
              Sessions
            </NavLink>
          </nav>
        </header>
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/characters" element={<CharacterList />} />
            <Route exact path="/sessions" element={<SessionList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
