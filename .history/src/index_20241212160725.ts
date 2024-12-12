require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import coursesRoutes from './routes/courses';

const app = express();

app.use(express.json());//body-parser => converts data into JSON

app.use(cookieParser());

//we need three routes 
// one for the user, one for the teacher and for the courses

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/courses', coursesRoutes);


async function main(){
    if(process.env.mongo_URL)
        await mongoose.connect(process.env.mongo_URL);
    else{
        throw new Error("Mongo DB URL is not loading!");
    }
    app.listen(3000);
    console.log("listening on port 3000");
}


main