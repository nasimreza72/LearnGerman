import "./style.css";
import logo from "./germanLogo.png";
import logo1 from "./logo1.png";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cases from "./Cases";
import Article from "./Article";
import Translate from "./En-En";
import ListedWord from "./ListedWord.jsx";
import TranslateToGerman from "./De-En";
import Home from "./Home";
import Login from "./Login";
import { useState } from "react";

export default function App() {
  const [login, setLogin] = useState(false);
  console.log(login);

  return (
    <div className="App">
      {login ? (
        <div className="navi">
          <img className="background-logo" src={logo} alt="" />
          <Navbar className="navigation" expand="md" color="warning">
            <Container fluid>
              <NavLink to="/">
                <img className="nav-logo" src={logo1} alt="" />
              </NavLink>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="p-1 d-flex sub-nav "
                  style={{ maxHeight: "190px" }}
                  navbarScroll
                >
                  <NavLink to="/article" element={<Article />}>
                    Article
                  </NavLink>
                  <NavLink to="/cases" element={<Cases />}>
                    Cases
                  </NavLink>
                  <NavLink to="/preposition">Preposition</NavLink>
                  {/* <NavLink to="/main/archive">Verb</NavLink> */}
                  <NavLink to="/translate" element={<Translate />}>
                    En-En
                  </NavLink>
                  <NavLink to="/toGerman">De-En</NavLink>
                  <NavLink to="/listed-word" element={<ListedWord />} >Your Vocabulary</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="router-path">
            <Routes>
              <Route
                path="/"
                element={<Home login={login} setLogin={setLogin} />}
              />
              <Route path="/article" element={<Article />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/listed-word" element={<ListedWord />} />
              <Route path="/translate" element={<Translate />} />
              <Route path="toGerman" element={<TranslateToGerman />} />
            </Routes>
          </div>
        <button id="logout" onClick={() => setLogin(false)}>logout</button>

        </div>
      ) : (
        <Login login={login} setLogin={setLogin} />
      )}
    </div>
  );
}
