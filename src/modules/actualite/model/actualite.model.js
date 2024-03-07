const mongoose = require("mongoose");

const shema = new mongoose.Schema(
  {
    idEtudiant: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Etudiant",
    },
    text: {
      type: String,
      required: true,
    },
    fullfilepath: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Actualite = mongoose.model("Actualite", shema);

module.exports = Actualite;
