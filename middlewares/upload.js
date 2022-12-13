
const path = require("path");
const multer = require("multer");

const tempDir = path.join(__dirname, "../", "tmp");

// налаштування для міделвари multer
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // limits: {
  //  тут можемо вказати обмеження по розміру, назві, кількості файлів і багато іншого (див. документацію)
  // }
});

const upload = multer({ storage: multerConfig });

module.exports = { upload };