import { Router } from 'express';
import {addTag, getTags} from "../controllers/tag.js";
const router = Router();

router.get("/", getTags)
router.post("/add", addTag)
export default router;