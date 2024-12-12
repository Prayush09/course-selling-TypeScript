import { purchaseModel } from "../db";

const Router = require("express");


const courseRouter = Router();

    courseRouter.post("/purchase", userMiddleware, async (req, res) => {
        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
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