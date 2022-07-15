import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path"
const storage = multer.diskStorage({
    limits: {
        fileSize: 5242880 ,
    },
    destination: function (req, file, cb) {
        cb(null, `${path.resolve()}/../client/src/assets/uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, `${nanoid()}-${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") return cb(new Error("File type is not supported"), false);
        else cb(null, true);
    },
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
};

export { upload, deleteFiles, deleteFile }