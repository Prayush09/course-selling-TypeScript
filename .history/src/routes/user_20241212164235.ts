import express, {Request, Response, NextFunction} from 'express';
import { userModel } from '../db';
const router = express.Router();

//what functions will the user perform on the website?
// Lets say 

type user = {
    email: string,
    password: string
}

router.post('/signup', async (req: Request, res: Response): Promise<any> => {
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
            message:"User successfully signed up!"
        })
    } catch(error){
        res.status(500).json({message: "Error occurred during sign-up", error});
    }
})

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    const Credentials: user = {
        email: req.body.email,   
        password: req.body.password
    };

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_User_Password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
            maxAge: 3600000 // 1 hour
        })

        res.render('userDashboard', {user});
    } catch (error) {
        res.status(500).json({ message: "Error during login", error });
    }
})