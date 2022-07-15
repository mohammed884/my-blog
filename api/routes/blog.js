import { Router } from 'express';
import { getBlogs, getBlog, addBlog, editBlog } from "../controllers/blog.js";
import { upload } from "../utilities/mediaMethods.js";
import {isAdmin} from "../middleware/middleware.js"
const router = Router();

router.get("/", getBlogs)

router.get("/:title", getBlog);

//ADMIN ROUTES
router.use(isAdmin);

router.post("/add", upload.single("cover"), addBlog);

router.patch("/edit", editBlog);


export default router;