// Check user role
exports.checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: `Access denied. Required role: ${requiredRole}` });
    }

    next();
  };
};

// Allow multiple roles
exports.checkRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
