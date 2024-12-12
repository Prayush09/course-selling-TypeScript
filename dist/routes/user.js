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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Credentials = {
        email: req.body.email,
        password: req.body.password
    };
    if (!Credentials.email || Credentials.password) {
        return res.status(400).json({
            message: "Credentials missing for sign-up!"
        });
    }
    try {
        const email = Credentials.email;
        const doesExists = yield db_1.userModel.findOne({ email });
        if (doesExists) {
            res.status(409).json({
                message: "User Already exists"
            });
        }
        const newUser = new db_1.userModel({
            email: Credentials.email,
            password: Credentials.password
        });
        yield newUser.save();
        res.status(201).json({
            message: "User successfully signed up!"
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error occurred during sign-up", error });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (!Credentials.email || !Credentials.password) {
            res.status(401).json({
                message: "Please enter both email and password!"
            });
        }
        const email = Credentials.email;
        const currentUser = yield db_1.userModel.findOne({ email });
        if (currentUser === null)
            res.status(404).json({ message: "User does not exist" });
        else {
            if (process.env.JWT_User_Password) {
                const token = jsonwebtoken_1.default.sign({ id: currentUser._id }, process.env.JWT_User_Password);
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
}));
exports.default = router;
