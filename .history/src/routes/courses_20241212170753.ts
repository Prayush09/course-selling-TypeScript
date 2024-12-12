import { purchaseModel } from "../db";

const Router = require("express");


const router = Router();

    router.post("/purchase", userMiddleware, async (req: Request, res: Response) => {
        const userId = req.userId;
        const courseId = req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.statusjson({
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