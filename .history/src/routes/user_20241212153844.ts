import express from 'express';

const router = express.Router();

//what functions will the user perform on the website?
// Lets say 

type user = {
    email: string,
    password: string
}

router.get('/signup', async(req, res) => {
    const creds: user = {
        email: 
    };
})