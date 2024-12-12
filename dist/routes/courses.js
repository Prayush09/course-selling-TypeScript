"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const Router = require("express");
const userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
const router = Router();
router.post("/purchase", userMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req.body.userId && req.body.courseId)) {
        res.status(400).json({
            message: "missing data like userId or courseId"
        });
    }
    else {
        const pD = {
            userId: req.body.userId,
            courseId: req.body.courseId
        };
        const uid = pD.userId;
        const cid = pD.courseId;
        yield db_1.purchaseModel.create({
            uid,
            cid
        });
        res.status(200).json({
            message: "You have successfully bought the course"
        });
    }
}));
router.get('/seeCourses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.purchaseModel.find({});
    res.status(200).json({
        courses
    });
}));
exports.default = router;
