import multer, { memoryStorage } from "multer";
import express from "express";
import generateText from "../service/textGeneration.service.js";
const router = express.Router();
const upload = multer({stroage:memoryStorage()});

router.post("/",upload.single("file"),async(req,res)=>{
    const file =req.file;
    const prompt=req.body.prompt;
const response = await generateText(file,prompt);
res.status(200).json(response);
console.log(req.file.buffer);


})

export default router