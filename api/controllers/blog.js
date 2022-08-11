import Blog from "../models/Blog.js";
import BlogSchema from "../validation/blog.js"
import dayjs from "dayjs"
import { deleteFile } from "../utilities/mediaMethods.js";
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isActive: true }).populate("tags").lean();
        console.log("get blogs");
        res.send(blogs);
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
}
export const getBlog = async (req, res) => {
    try {
        const title = req.params.title;
        const blog = await Blog.findOne({ title, isActive: true }).populate("tags");
        res.send(blog);
    } catch (err) {
        console.log(err);
        res.send({ success: false })
    }
};
export const addBlog = async (req, res) => {
    try {
        const { title, shortDescription, tags, rawContent } = req.body;
        await BlogSchema.validateAsync({ title, shortDescription, tags: JSON.parse(tags), rawContent: JSON.parse(rawContent) });
        await Blog.create({
            title: title.trim(),
            shortDescription,
            rawContent: JSON.parse(rawContent),
            tags: JSON.parse(tags),
            date: dayjs().format("MMMM D, YYYY"),
            cover: req.file.filename,
        });
        res.send({ success: true })
    } catch (err) {
        if (err.isJoi) {
            const { message, context } = err.details[0];
            res.send({ success: false, message, context });
        }
        else res.send({ success: false, message: err.message })
    }
};
export const editBlog = async (req, res) => {
    try {
        const title = req.params.title;
        const blog = await Blog.findOne({ title });

        for (const key in req.body) {
            const fieldValue = req.body[key];
            switch (key) {
                case "tags":
                case "rawContent":
                    const parsedValue = JSON.parse(req.body[key])
                    blog[key] = parsedValue
                    break;
                case "cover":
                    break;
                default:
                    if (fieldValue !== blog[key]) blog[key] = fieldValue.trim()
            }
        };
        if (req.file) {
            deleteFile(blog.cover)
            blog["cover"] = req.file.filename;
        }
        await blog.save();
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        if (req.file) deleteFile(req.file.filename)
        res.send({ success: false, message: err.message })
    }
};
export const disableBlog = async (req, res) => {
    try {
        const title = await req.params.title;
        await Blog.updateOne({ title }, {
            $set: {
                "isActive": false
            }
        })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message })
    }
};
export const activeBlog = async (req, res) => {
    try {
        const title = await req.params.title;
        await Blog.updateOne({ title }, {
            $set: {
                "isActive": true
            }
        })
        res.send({ success: true })
    } catch (err) {
        console.log(err);
        res.send({ success: false, message: err.message });
    }
};
export const deleteBlog = async (req, res) => {
    try {
        const title = req.params.title;
        const blog = await Blog.findOne({title})
        deleteFile(blog.cover);
        await blog.delete;
        res.send({ success: true })
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
};
