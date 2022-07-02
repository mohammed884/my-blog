import { Router } from 'express';
import Tag from "../models/Tag.js";
const router = Router();

router.get("/", async (req, res) => {
    const tags = [
        {title:"#SEO", count:1},
        {title:"#RENDERING", count:2},
        {title:"#REACT", count:5},
        {title:"#SOLID.JS", count:5},
        {title:"#NEXT.JS", count:5},
        {title:"#JS", count:5},
        {title:"#NODE.JS", count:5},
        {title:"#EXPRESS.JS", count:5},
    ];
    res.send(tags)
})
router.post("/", (req, res) => {
    
})
export default router;