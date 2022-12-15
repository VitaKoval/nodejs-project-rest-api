const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { MONGO_URL, PORT } = process.env;

const connectMongo = mongoose.connect(MONGO_URL);

connectMongo
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
