"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storage = multer.diskStorage({
    //aonde sera guardado os uploads
    destination: function (req, file, cb) {
        cb(null, "uploads/"); //diretorio aonde sera salvo 
    },
    //nome arquivo
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploads = multer({ storage: storage });
exports.default = uploads;
