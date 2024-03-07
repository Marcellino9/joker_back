const User = require("../user/models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const login = async (req, res) => {
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }
  const fondUser = await User.findOne({ email }).exec();
  if (!fondUser) {
    return res.status(401).json({ message: "unothorized" });
  }
  const mathPawd = bcrypt.compare(password, fondUser.password);
  if (!mathPawd) {
    return res.status(401).json({ message: "unothorized" });
  }

  const accessToken = jwt.sign(
    {
      userInfo: {
        username: fondUser.email,
        roles: fondUser.roles,
      },
    },
    process.env.ACCES_TOKEN_SECRET,
    { expiresIn: "15mn" }
  );
  const refreshToken = jwt.sign(
    { username: fondUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};
const refresh = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.status(401).json({ message: "unothorized" });
  }
  const refreshToken = cookie.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbiden" });
      }
      const fondUser = await User.findOne({
        email: decoded.username,
      });
      if (!fondUser) {
        return res.status(401).json({ message: "Unothorized" });
      }
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: fondUser.email,
            roles: fondUser.roles,
          },
        },
        process.env.ACCES_TOKEN_SECRET,
        { expiresIn: "15mn" }
      );
      res.json({ accessToken });
    })
  );
};
const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "cookie cleard" });
};
module.exports = {
  login,
  refresh,
  logout,
};
