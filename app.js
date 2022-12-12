const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const tempDir = path.join(__dirname, "temp");

// налаштування для міделвари multer
const multerStorage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cd(null, file.originalname);
  },
  // limits: {
  //  тут можемо вказати обмеження по розміру, назві, кількості файлів і багато іншого (див. документацію)
  // }
});

const upload = multer({ storage: multerStorage });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
