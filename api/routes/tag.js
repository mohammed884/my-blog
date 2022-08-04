import {isAdmin} from "../middleware/middleware.js"
import { Router } from 'express';
import { addTag, getTags, editTag, getTag } from "../controllers/tag.js";
const router = Router();

router.get("/", getTags)
router.get("/:title", isAdmin, getTag)
router.post("/add", addTag)
router.patch("/edit/:title", editTag)
export default router;