import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    count: { type: Number, required: true },
    date: { type: String, required: true },
})
const Tag = mongoose.model("tags", Schema);
export default Tag