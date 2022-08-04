import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
    title: { type: String, required: true, },
    shortDescription: { type: String, required: true, },
    tags: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags", }],
        required: true,
    },
    date: { type: String, required: true },
    rawContent: { type: Object, required: true},
    views: { type: Number, default: 0 },
    likes: { type: Array, default: [] },
    isActive: { type: Boolean, default: true },
    cover:{type:String, required: true}
});
const Blog = mongoose.model("blogs", Schema);
export default Blog;