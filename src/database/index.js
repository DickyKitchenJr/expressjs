const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`mongodb+srv://${process.env.MONGO}@cluster0.zb0elao.mongodb.net/`)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));
