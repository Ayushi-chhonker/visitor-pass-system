import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Visitor from "./pages/Visitor";
import Appointment from "./pages/Appointment";
import Pass from "./pages/GeneratePass.js";
import Dashboard from "./pages/Dashboard.js";
import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <div className="container">

        <h1>Visitor Pass System</h1>

        <nav className="navbar">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <br /><br />

          <Link to="/">
            Add Visitor
          </Link>

          <br /><br />

          <Link to="/appointment">
            Appointment
          </Link>

          <br /><br />

          <Link to="/pass">
            Generate Pass
          </Link>

        </nav>

        <hr />

        <Routes>

          <Route
          path="/dashboard"
          element={<Dashboard />}
          />

          <Route
            path="/"
            element={<Visitor />}
          />

          <Route
            path="/appointment"
            element={<Appointment />}
          />

          <Route
            path="/pass"
            element={<Pass />}
          />

        </Routes>

        <footer className="footer">

       <p> Visitor Pass Management System © 2026</p>

       </footer>

      </div>

    </BrowserRouter>
  );
}

export default App;
