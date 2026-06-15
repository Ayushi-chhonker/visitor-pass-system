import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Access denied. No token provided."
      });
    }

    // Extract token
   const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user information
    req.user = decoded;
    // Continue to next middleware/controller
    next();

  } catch (error) {

  console.log(error);

  return res.status(401).json({
    msg: error.message
  });

}
};

export default authMiddleware;