import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Visitor from "./pages/Visitor.js";
import Appointment from "./pages/Appointment.js";
import Pass from "./pages/GeneratePass.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import QRScanner from "./pages/QRScanner.js";
import PreRegistration from "../src/pages/preRegistration.js";
import PreRegistrationList from "../src/pages/preregistrationList.js"
import ProtectedRoute from "./pages/protectRoute.js";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const user = JSON.parse(
  localStorage.getItem("user")
);

const role = user?.role;

const handleLogout = () => {

  localStorage.clear();

  window.location.href = "/login";

};

  return (

    <BrowserRouter>

      <div className="container">

        <h1>Visitor Pass System</h1>

        <nav className="navbar">

          {role === "admin" && (
          <>
             <Link to="/dashboard">
               Dashboard
             </Link>

          <br /><br />
          </>
          )}

          <br /><br />

          <Link to="/login">
            Login
          </Link>

          <br /><br />

          {(role === "admin" || role === "employee") && (
          <>
            <Link to="/visitor">
               Add Visitor
            </Link>

          <br /><br />
          </>
      )}

          <br /><br />

          <Link to="/appointment">
            Appointment
          </Link>

          <br /><br />

          <Link to="/pass">
            Generate Pass
          </Link>

         {role === "security" && (
          <>
          <Link to="/scanner">
              QR Scanner
          </Link>

           <br /><br />
          </>
        )}

        {(role === "admin"|| role === "employee") && (
          <>
          <Link to="/preregistration">
         Pre Registration
        </Link>

        <br /><br />
          </>
        )}

        <Link to="/preregistrationlist">
        Pre Registration Requests
        </Link>

       <br /><br />
       <button onClick={handleLogout}>
         Logout
      </button>

      <br /><br />

        </nav>

        <hr />

        <Routes>

          <Route
          path="/dashboard"
          element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>
          }
          />
          <Route
           path="/login" 
           element={<Login />}
           />
          <Route
          path="/visitor"
          element={
          <ProtectedRoute>
          <Visitor />
          </ProtectedRoute>
          }
          />
          
        <Route
        path="/appointment"
        element={
        <ProtectedRoute>
          <Appointment />
        </ProtectedRoute>
        }
       />

      <Route
        path="/pass"
        element={
          <ProtectedRoute>
          <Pass />
          </ProtectedRoute>
        }
      />
         <Route
         path="/scanner"
        element={
         <ProtectedRoute>
         <QRScanner />
         </ProtectedRoute>
        }
        />

        <Route
        path="/preregistration"
        element={
        <ProtectedRoute>
        <PreRegistration />
        </ProtectedRoute>
        }
       />

          <Route
          path="/preregistrationlist"
          element={<PreRegistrationList />}
          />
        </Routes>


      <footer className="footer">
     <p>Visitor Pass Management System © 2026 </p>
     <p>Developed by Ayushi Chhonker </p>
</footer>
    </div>

    </BrowserRouter>
  );
}

export default App;
