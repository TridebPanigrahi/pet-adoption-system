const JWT = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).status({ message: "Empty Token" });
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Admin Only" });
  }
  next();
};

module.exports = {
  protect,
  isAdmin,
};
