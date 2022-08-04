import env from "dotenv";
env.config()
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import compression from "compression";
import blogRoute from "./routes/blog.js";
import tagRoute from "./routes/tag.js";
import loginRoute from "./routes/login.js";
import {isAdmin} from "./middleware/middleware.js";
import exportToken from "./utilities/exportToken.js";
const { COOKIE_PARSER_SECRET, CLIENT_URL, DB_URL } = process.env;
const app = express();
const PORT = 5000;

//CONNECT DATABASE
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//APPLY MIDDLEWARE
app.use(compression())
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/blog", blogRoute)
app.use("/tag", tagRoute)
app.use("/login", loginRoute)
app.get("/role", (req, res) => {
    try {
        const { ADMIN_PASSWORD } = process.env;
        const decoded = exportToken(req.cookies.token)
        if (!decoded) return res.send({ success: false, message: "Unauthorized" });
        if (ADMIN_PASSWORD !== decoded.password) return res.send({ success: false, message: "Unauthorized" })
        res.send({ success: true})
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: "Unauthorized"})
    }
})
//SERVER
app.listen(PORT, (err) => {
    if (err) throw err
    else console.log(`Server running on ${PORT}`);
})