// Checks whether the logged-in user's role is allowed to access a particular route.
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    // authMiddleware should run before this middleware. It verifies the JWT and stores the user's details in req.user.
    if (!req.user) {
      return res.status(401).json({
        msg: "Authentication required."
      });
    }

    // Check if the role stored in the JWT is one of the roles allowed for this route.
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        msg: "Access denied. You do not have permission to perform this action."
      });
    }

    // The user is authenticated and has the required role.
    next();
  };
};

export default roleMiddleware;