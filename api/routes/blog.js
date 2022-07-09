import { Router } from 'express';
import {getBlogs,getBlog, addBlog} from "../controllers/blog.js";
import {upload} from "../utilities/mediaMethods.js"
const router = Router();

const data = [
    {
        title: "احداث صادمة عام 1997",
        cover: "garry-kasprove.jpg",
        shortDescription: "وصف قصير جدا يستخدم لاجل اعطاء الزبدة و جذب المشاهد",
        tags: [{ title: "#SEO" }],
        date: "6/20/2022",
        content: "lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem",
        views: 120,
        likes: [
            "Mohammed",
            "Ahmed",
            "Hussin",
            "Ali",
        ],
        comments: [
            { name: "Mohammed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ahmed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Hussin", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ali", text: "awdjopawujdsawjdpsjapdwasd" },
        ]
    },
    {
        title: "تخصصات الذكاء الاصطناعي",
        cover:"ai.jpg",
        shortDescription: "some dummb description",
        tags: [{ title: "#RENDERING" }, { title: "#SEO" }],
        date: "6/20/2022",
        content: "lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem",
        views: 20,
        likes: [
            "Mohammed",
            "Ahmed",
            "Hussin",
            "Ali",
        ],
        comments: [
            { name: "Mohammed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ahmed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Hussin", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ali", text: "awdjopawujdsawjdpsjapdwasd" },
        ]
    },
    {
        title: "تخصصات الذكاء الاصطناعي",
        cover:"ai.jpg",
        shortDescription: "some dummb description",
        tags: [{ title: "#RENDERING" }, { title: "#SEO" }],
        date: "6/20/2022",
        content: "lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem",
        views: 20,
        likes: [
            "Mohammed",
            "Ahmed",
            "Hussin",
            "Ali",
        ],
        comments: [
            { name: "Mohammed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ahmed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Hussin", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ali", text: "awdjopawujdsawjdpsjapdwasd" },
        ]
    },    {
        title: "تخصصات الذكاء الاصطناعي",
        cover:"ai.jpg",
        shortDescription: "some dummb description",
        tags: [{ title: "#RENDERING" }, { title: "#SEO" }],
        date: "6/20/2022",
        content: "lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem",
        views: 20,
        likes: [
            "Mohammed",
            "Ahmed",
            "Hussin",
            "Ali",
        ],
        comments: [
            { name: "Mohammed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ahmed", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Hussin", text: "awdjopawujdsawjdpsjapdwasd" },
            { name: "Ali", text: "awdjopawujdsawjdpsjapdwasd" },
        ]
    },
]
router.get("/", getBlogs)
router.get("/:title", getBlog)
router.post("/add",upload.single("cover"), addBlog)
export default router;