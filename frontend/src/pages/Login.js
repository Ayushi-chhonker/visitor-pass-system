import { useState } from "react";
import axios from "axios";

/*
Login Page: This component allows registered users to log in to the Visitor Pass Management System.
After successful login:
1. JWT token is stored in localStorage.
2. Logged-in user details are stored.
3. User is redirected to the dashboard.
*/

function Login() {

  // Store email and password entered by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login when user submits the form
  const handleLogin = async (event) => {

// Prevent page refresh after form submission
event.preventDefault();
    try {

      // Send login request to backend API
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {email,password});
      console.log("Login Response:", response.data);

      // Save JWT token.
      // It will be used to access protected APIs.
      localStorage.setItem("token",response.data.token);

      // Store logged-in user information.
      // JSON.stringify() converts object into string
      // because localStorage stores only strings.
      localStorage.setItem("user",JSON.stringify(response.data.user));

      console.log( "Saved Token:",
        localStorage.getItem("token")
      );
      alert("Login Successful");

      // Redirect user to dashboard after login
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login Failed");
      console.log("Login Error:", err);
    }
  };
  return (

    <div>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email" value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br /><br />
        <input type="password" placeholder="Enter Password" value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br /><br />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;