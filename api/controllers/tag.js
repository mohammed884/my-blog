import Tag from "../models/Tag.js";
import dayjs from "dayjs"
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find().lean();
        res.send(tags);
    } catch (err) {
        console.log(err);
        res.send({ sucess: false, message: err.message });
    }
};
export const addTag = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.send({ sucess: false, message: "املا الحقل المطلوب" })
        await Tag.create({
            title,
            date: dayjs().locale('de').format("MMMM D, YYYY"),
        });
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ sucess: false, message: err.message });
    }
};
export const deleteTag = async (req, res) => {};
export const editTag = async (req, res) => {};