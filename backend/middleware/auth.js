const jwt = require("jsonwebtoken");

// Auth middleware for all authenticated users
const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied :- No token provided" });
  }

  const token = bearerHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, email }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token / Expired" });
  }
};

// Admin-only middleware
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }
    next();
  });
};

module.exports = { auth, adminAuth };
