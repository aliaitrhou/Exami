import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach decoded data to user object
    // so it become available on every route.
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export function globalAuthMiddleware(req, res, next) {
  const publicRoutes = ["/api/login", "/api/signup", "/api/auth/check"];

  // Only apply auth to API routes
  if (req.path.startsWith("/api") && !publicRoutes.includes(req.path)) {
    return authMiddleware(req, res, next);
  }

  next();
}
