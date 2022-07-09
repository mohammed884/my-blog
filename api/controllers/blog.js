import Blog from "../models/Blog.js";
import BlogSchema from "../validation/blog.js"
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().lean();
        res.send({ blogs, success: true });

    } catch (err) {
        console.log(err);
        res.send({ success: false })
    }
}
export const getBlog = async (req, res) => {
    try {
        const title = req.params.title;
        const blog = await Blog.findOne({ title });
        res.send({ blog, success: true });

    } catch (err) {
        console.log(err);
        res.send({ success: false })
    }
};
export const addBlog = async (req, res) => {
    try {
        const { title, shortDescription, tags, content } = req.body;
        console.log(tags);
        await BlogSchema.validateAsync({ title, shortDescription, tags, content });
        
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            console.log("joi err", err);
        }
        res.send({ success: false })
    }
}