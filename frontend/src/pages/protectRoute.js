import { Navigate } from "react-router-dom";
/*
This component checks whether the user is logged in.If a JWT token is available in localStorage,the requested page is displayed.
Otherwise, the user is redirected to the login page.
*/

function ProtectedRoute({ children }) {
  // Read login token stored after successful login
  const token = localStorage.getItem("token");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // User is authenticated
  return children;
}
export default ProtectedRoute;