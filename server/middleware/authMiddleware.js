import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
