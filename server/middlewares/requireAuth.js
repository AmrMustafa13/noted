import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "You must be logged in",
    });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: "You must be logged in",
      });
    }

    const { id } = payload;

    req.userId = id;

    next();
  });
};
