import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get the Authorization header sent by the frontend. The token should be sent in the format: Bearer <token>
    const authHeader = req.headers.authorization;

    // Without a token, the user cannot access protected routes.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Access denied. Please login first."
      });
    }

    // Remove "Bearer" and keep only the JWT token.
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret stored in .env. This also checks whether the token is expired or invalid.
    const verifiedUser = jwt.verify(
      token, process.env.JWT_SECRET
    );

    // Store the decoded user information so that the next middleware or controller can use the user's id and role.
    req.user = verifiedUser;
    next();

  } catch (err) {
    // jwt.verify() throws an error for an invalid or expired token.
    console.log("Authentication Error:", err);

    return res.status(401).json({
      msg: "Invalid or expired token."
    });
  }
};

export default authMiddleware;