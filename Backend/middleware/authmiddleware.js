const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ message: "Token not found, please send the token" });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = data.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { authentication };
