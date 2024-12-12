import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user';

const app = express();

app.use(express.json());//body-parser => converts data into JSON

app.use(cookieParser());

//we need three routes 
// one for the user, one for the teacher and for the courses

app.use('/user')