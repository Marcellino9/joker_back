const Actualite = require("./model/actualite.model");
const moment = require("moment");
const path = require("path");
const getAcu = async (req, res) => {
  const allData = await Actualite.find().lean();
  if (!allData) {
    return res.status(400).json({ message: "there is no User" });
  }
  res.json(allData);
};
const getImage = async (req, res) => {
  try {
    const imagePath = path.join(
      __dirname,
      "../../../images/",
      req.params.filename
    ); // Assuming images are located at the root level
    console.log("haha"); // Just for debugging
    return res.sendFile(imagePath);
  } catch (error) {
    console.error("Error in getImage controller:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const createActu = async (req, res) => {
  const { idEtudiant, text } = req.body;
  const date = moment().format("DD-MM-YYYY");
  const fullfilepath = req.file.originalname;
  console.log(req.body);
  if (!idEtudiant || !text || !fullfilepath) {
    return res.status(400).json({ message: "All field are required" });
  }
  const insert = await Actualite.create({
    idEtudiant: idEtudiant,
    text: text,
    date: date,
    fullfilepath: fullfilepath,
  });
  if (insert) {
    return res.json({ message: "Actualite insert successfully" });
  } else {
    return res.status(400).json({
      message:
        "Something's wrong, the data is note valide or it's a server error",
    });
  }
};
const updateActu = async (req, res) => {
  const { id, idEtudiant, text } = req.body;
  const fullfilepath = req.file.originalname;
  if (!idEtudiant || !text || !fullfilepath) {
    return res.status(400).json({ message: "All field are required" });
  }
  const actualite = await Actualite.findById(id).exec();
  actualite.text = text;
  actualite.fullfilepath = fullfilepath;

  const succesfully = actualite.save();
  res.json({ message: "Update actuality succesfully" });
};
const deleteActu = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Id required" });
  }
  const actualite = await Actualite.findById(id).exec();
  if (!actualite) {
    return res.status(400).json({ message: "User not found in the database" });
  }
  const result = await user.deleteOne();
};
module.exports = {
  getAcu,
  createActu,
  updateActu,
  deleteActu,
  getImage,
};
