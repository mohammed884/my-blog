import { Router } from 'express';
import { getBlogs, getBlog, addBlog, editBlog, deleteBlog } from "../controllers/blog.js";
import { upload } from "../utilities/mediaMethods.js";
import {isAdmin} from "../middleware/middleware.js"
const router = Router();

router.get("/", getBlogs)

router.get("/:title", getBlog);

//ADMIN ROUTES
router.use(isAdmin);

router.post("/add", upload.single("cover"), addBlog);

router.patch("/edit/:title", upload.single("cover"),editBlog);

router.delete("/delete/:title", deleteBlog)
export default router;