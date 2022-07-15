import dayjs from 'dayjs';
import { Router } from 'express';
import jwt from "jsonwebtoken"
const router = Router();

router.post("/", (req, res) => {
    const password = req.body.password;
    const { JWT_SECRET, ADMIN_PASSWORD } = process.env;
    if (!password || password !== ADMIN_PASSWORD) return res.send({ success: false, message: "خطا في الباسورد" })
    const token = jwt.sign({
        password: ADMIN_PASSWORD,
        expiresIn:"5m"
    }, JWT_SECRET);
    res.cookie("token", token, { maxAge: dayjs().add(5, "months"), httpOnly: true });
    res.send({success: true})
})
export default router;