//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "../src/components/Home";
import Profile from "../src/components/Profile";
import CharacterList from "../src/components/CharacterList";
import CharacterSheet from "./components/CharacterSheet/";
import SessionList from "../src/components/SessionList";
import { AuthProvider } from './firebase/Auth';
import Login from "../src/components/Login"
import Session from "../src/components/Session";
import NotFound from "../src/components/NotFound";


function App() {
  return (
    <AuthProvider>
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
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/characters" element={<CharacterList />} />
            <Route exact path="/character/:id" element={<CharacterSheet />} />
            <Route exact path="/sessions" element={<SessionList />} />
            <Route exact path="/session/:id" element={<Session />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
