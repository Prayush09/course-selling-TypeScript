import { courseModel, purchaseModel } from "../db";
import {Request, Response} from 'express';
const Router = require("express");
import userMiddleware from '../middleware/userMiddleware';

const router = Router();

    type purchase = {
        userId: String,
        courseId: String
    }

    router.post("/purchase", userMiddleware, async (req: Request, res: Response) => {
        
        if(!(req.body.userId && req.body.courseId)){
            res.status(400).json({
                message: "missing data like userId or courseId"
            });
        }

        else{
            const pD: purchase = {
                userId: req.body.userId,
                courseId: req.body.courseId
            }
        
            const uid = pD.userId

            await purchaseModel.create({
                pD.userId,
                pD.courseId
            })

            res.status(200).json({
                message:"You have successfully bought the course"
            })
        }      
    })

    router.get('/seeCourses', async (req: Request, res: Response)=>{
        const courses = await purchaseModel.find({});

        res.status(200).json({
            courses
        })
    });

export default router;