import jwt from "jsonwebtoken";

/*
Authentication Middleware
Purpose:
This middleware checks whether the user is logged in
before allowing access to protected routes.

Workflow:
1. Read JWT token from Authorization header.
2. Verify the token using JWT secret key.
3. Store decoded user information in req.user.
4. Allow request to continue.
*/

const authMiddleware = (req, res, next) => {
  try {

    // Read Authorization header sent from frontend.
    // Expected format: Bearer <JWT Token>
    const authHeader = req.headers.authorization;

    // Stop the request if token is missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Access denied. Please login first."
      });
    }

    // Extract only the token by removing the word "Bearer"
    const token = authHeader.split(" ")[1];

    // Verify whether the token is valid or not.
    // jwt.verify() also checks if the token has expired.
    const verifiedUser = jwt.verify( token, process.env.JWT_SECRET );

    // Store decoded user details inside request object.
    // This data can be accessed in the next middleware
    // or controller without verifying the token again.
    req.user = verifiedUser;

    // Token is valid, continue to next middleware
    next();

  } catch (err) {
    // Print error in terminal for debugging
    console.log("Authentication Error:", err);
    return res.status(401).json({
      msg: "Invalid or expired token."
    });
  }
};
export default authMiddleware;