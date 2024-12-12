import express, {Request, Response, NextFunction} from 'express';

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
        const email = Credentials.email
        const doesExists: user = await userModel.findOne({Credentials.email});
    }
})