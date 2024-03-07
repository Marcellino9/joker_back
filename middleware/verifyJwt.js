const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.autorization || req.headers.Autorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbiden" });
    req.first_name = decoded.userInfo.first_name;
    req.last_name = decoded.userInfo.last_name;
    next();
  });
};
module.exports = verifyJwt;
