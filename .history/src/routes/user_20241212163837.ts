import express, {Request, Response, NextFunction} from 'express';
import { userModel } from '../db';
const router = express.Router();

//what functions will the user perform on the website?
// Lets say 

type user = {
    email: string,
    password: string
}

router.get('/signup', async (req: Request, res: Response): Promise<any> => {
    const Credentials: user = {
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
        const doesExists: user | null = await userModel.findOne({email});
        if(doesExists){
            res.status(409).json({
                message: "User Already exists"
            });
        }
    
        //hash the password using bycrypt: not doing so right now
        const newUser = new userModel({
            email: Credentials.email,
            password: Credentials.password
        });

        await newUser.save();

        res.status(201).json({
            message:"User successfully signedup!"
        })
    } catch(error){
        res.status(500).json({message: "Error occurred during sign-up", error});
    }
})