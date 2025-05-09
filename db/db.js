const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected successfully!")
  } catch (e) {
    console.log("Couldn't connect :(");
  }
};

module.exports = connectToDb;
