const Router = require("express");
const { userMiddleware } = require("../middleware/userMiddleware");
const { purchaseModel } = require("../db");

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

    courseRouter.get('/seeCourses', async (req, res)=>{
        const courses = await purchaseModel.find({});

        res.json({
            courses
        })
    });

module.exports= {
    courseRouter: courseRouter
};