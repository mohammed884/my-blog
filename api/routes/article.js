import { Router } from 'express';
const router = Router();

const data = [
    {
        title: "improve seo",
        shortDescription: "وصف قصير جدا يستخدم لاجل اعطاء الزبدة و جذب المشاهد",
        tags: [{ title: "seo" }],
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
        title: "blog",
        shortDescription: "some dummb description",
        tags: [{ title: "blog" }],
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
    }
]
router.get("/", (req, res) => {
    res.send(data)

})
router.get("/:title", (req, res) => {
    const title = req.params.title.replace(/-/g, " ");
    const blog = data.find(data => data.title === title);
    res.send(blog)
})
export default router;