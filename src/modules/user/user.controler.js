const User = require("./models/user.model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "there is no User" });
  }
  res.json(users);
};

const createUser = async (req, res) => {
  const { nom, prenom, password, email, niveau } = req.body;
  if (!nom || !prenom || !password || !email || !niveau) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //duplicata
  const duplicata = await User.findOne({ nom, prenom, email, niveau })
    .lean()
    .exec();
  if (duplicata) {
    return res
      .status(400)
      .json({ message: `the user ${nom} ${prenom} already existe` });
  }
  const hashPwd = await bcrypt.hash(password, 10);
  const userObject = { nom, prenom, password: hashPwd, email, niveau };
  const insertUser = await User.create(userObject);
  if (!insertUser) {
    return res.status(400).json({ message: "Not found or data invalid" });
  }
  res.json({ message: `new user insert` });
};

const updateUser = async (req, res) => {
  const { id, nom, prenom, password, email, niveau } = req.body;
  if ((!nom || !prenom || !password || !email, !niveau)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //duplicata
  const duplicata = await User.findOne({ nom, prenom, email, niveau })
    .lean()
    .exec();
  if (duplicata && duplicata?._id.toString() !== id) {
    return res
      .status(400)
      .json({ message: `the user ${nom} ${prenom} already existe` });
  }
  const user = await User.findById(id).exec();
  //hash password
  const haspassword = await bcrypt.hash(password, 10);
  user.nom = nom;
  user.prenom = prenom;
  user.password = haspassword;
  user.email = email;
  user.niveau = niveau;
  const succesfully = user.save();
  res.json({ message: "Update User succesfully" });
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found in the database" });
  }
  const result = await user.deleteOne();
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
