const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join('images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

const fileStorage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, imagesDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

module.exports = fileStorage;