import { purchaseModel } from "../db";
import {Request, Response} from 'express';
const Router = require("express");


const router = Router();

    router.post("/purchase", userMiddleware, async (req: Request, res: Response) => {
        
        await purchaseModel.create({
            userId,
            courseId
        })

        res.status(200).json({
            message:"You have successfully bought the course"
        })
    })

    router.get('/seeCourses', async (req, res)=>{
        const courses = await purchaseModel.find({});

        res.json({
            courses
        })
    });

export default router;