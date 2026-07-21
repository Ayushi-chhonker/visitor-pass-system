/*
Role Authorization Middleware
Purpose:
After the user is authenticated, this middleware checks
whether the user has permission to access a particular
route.
Example: roleMiddleware("admin")

Only users whose role is "admin" will be allowed to
continue. Other users will receive an access denied
response.
*/

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Authentication middleware should run first.
    // It stores the logged-in user's details in req.user.
    if (!req.user) {

      return res.status(401).json({
        msg: "Authentication required."
      });
    }

    // Check whether the user's role is allowed to access the requested route.
    if (!allowedRoles.includes(req.user.role)) {

      return res.status(403).json({
        msg: "Access denied. You do not have permission to perform this action."
      });
    }
    
    // User is authorized, continue to the requested route.
    next();
  };
};
export default roleMiddleware;