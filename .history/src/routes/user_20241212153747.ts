import express from 'express';

const router = express.Router();

//what functions will the user perform on the website?
// Lets say 
router.get('/signup', async(req, res) => {
    const {email, password} = 
})