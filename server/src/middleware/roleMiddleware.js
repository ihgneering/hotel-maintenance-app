// user middleware based on role
export const allowRoles = (...roles) => {
  return (req, res, next) => {

    // user role from token/user
    const userRole = req.userProfile.role;

    // check role
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};