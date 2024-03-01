const mongoos = require("mongoose");

const connectDb = async () => {
  try {
    await mongoos.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
