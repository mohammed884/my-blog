import joi from "joi"
const BlogSchema = joi.object({
    title: joi.string().required(),
    shortDescription: joi.string().required(),
    tags: joi.array().required(),
    rawContent: joi.object().required(),
});
export default BlogSchema