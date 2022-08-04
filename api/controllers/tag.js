import Tag from "../models/Tag.js";
import dayjs from "dayjs"
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find().lean();
        res.send(tags);
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
};
export const getTag = async (req, res) => {
    try {
        const title = req.params.title
        const tag = await Tag.findOne({ title })
        res.send({ success: true, tag });
    } catch (err) {

        console.log(err);
        res.send({ success: false, message: err.message });
    }
}
export const addTag = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.send({ success: false, message: "املا الحقل المطلوب" })
        await Tag.create({
            title,
            date: dayjs().locale('de').format("MMMM D, YYYY"),
        });
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
};
export const editTag = async (req, res) => {
    try {
        const prevTitle = req.params.title;
        const title = req.body.title;
        await Tag.updateOne({ title: prevTitle }, {
            $set: {
                "title": title
            }
        })
        res.send({ success: true })
    } catch (err) {
        console.log(err);
    }

};
export const deleteTag = async (req, res) => { };