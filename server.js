const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const connectMongo = mongoose.connect(process.env.MONGO_URL);

connectMongo
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
