import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Visitor from "./pages/Visitor.js";
import Appointment from "./pages/Appointment.js";
import Pass from "./pages/GeneratePass.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import QRScanner from "./pages/QRScanner.js";
import PreRegistration from "../src/pages/preRegistration.js";
import PreRegistrationList from "../src/pages/preregistrationList.js"
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

          <Link to="/login">
            Login
          </Link>

          <br /><br />

          <Link to="/visitor">
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
          <Link to="/scanner">
          QR Scanner
         </Link>

        <br /><br />

        <Link to="/preregistration">
         Pre Registration
        </Link>

        <br /><br />

        <Link to="/preregistrationlist">
        Pre Registration Requests
        </Link>

       <br /><br />

        </nav>

        <hr />

        <Routes>

          <Route
          path="/dashboard"
          element={<Dashboard />}
          />
          <Route
           path="/login" 
           element={<Login />}
           />

          <Route
          path="/visitor"
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
          <Route
          path="/scanner"
          element={<QRScanner/>}
          />

          <Route
          path="/preregistration"
          element={<PreRegistration/>}
          />

          <Route
          path="/preregistrationlist"
          element={<PreRegistrationList />}
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
