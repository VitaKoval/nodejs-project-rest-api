const Jimp = require("jimp");
// перезаписуємо файл в тимчасовій папці на новий, з новими розмірами
const jimpForAvatars = async (req, res, next) => {
  const { path: tempDir} = req.file;

  await Jimp.read(tempDir)
    .then((file) =>
      file
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(tempDir)
    )
    .catch((err) => {
      console.error(err);
    });

  next();
};

module.exports = { jimpForAvatars };
