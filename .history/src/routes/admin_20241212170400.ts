import express, {Request, Response, NextFunction} from 'express';
import { adminModel } from '../db';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const router = express.Router();

//what functions will the user perform on the website?
// Lets say 

type user = {
    _id: mongoose.Types.ObjectId,
    email: string,
    password: string
}

router.post('/signup', async (req: Request, res: Response): Promise<any> => {
    const Credentials = {
        email: req.body.email,   
        password: req.body.password
    };

    if(!Credentials.email || Credentials.password){
        return res.status(400).json({
            message: "Credentials missing for sign-up!"
        });

    }

    try{
        const email = Credentials.email;
        const doesExists: user | null = await adminModel.findOne({email});
        if(doesExists){
            res.status(409).json({
                message: "User Already exists"
            });
        }
    
        //hash the password using bycrypt: not doing so right now
        const newUser = new adminModel({
            email: Credentials.email,
            password: Credentials.password
        });

        await newUser.save();

        res.status(201).json({
            message:"User successfully signed up!"
        })
    } catch(error){
        res.status(500).json({message: "Error occurred during sign-up", error});
    }
})

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    try{
        const Credentials = {
            email: req.body.email,   
            password: req.body.password
        };

        if(!Credentials.email || !Credentials.password){
            res.status(401).json({
                message: "Please enter both email and password!"
            });
        }

        const email = Credentials.email;
        //find the user in the database: 
        const currentUser: user | null = await adminModel.findOne({email});

        if(currentUser === null) 
            res.status(404).json({message: "User does not exist"});
        else{
            //create a jwt 
            if(process.env.JWT_User_Password){
                const token = jwt.sign({id: currentUser._id}, process.env.JWT_User_Password);
                
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000
                })
            }
        }
    }catch(error) {
        res.status(500).json({ message: "Error during login", error });
    }
});