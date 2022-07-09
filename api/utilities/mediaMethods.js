import multer from "multer";
import {nanoid} from "nanoid";
import fs from "fs";
const storage = multer.diskStorage({
    limts:{
        fileSize: 1024 * 1024 * 1000 * 1000,
    },
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${nanoid()}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage });
const deleteFile = async file => {
    fs.unlink(`/uploads/${file}`, err => {
        if (err) throw err;
    });
}
const deleteFiles = async files => {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fs.unlink(`/uploads/${file}`, err => {
            if (err) throw err;
        });
    }
}
export { upload, deleteFiles, deleteFile }