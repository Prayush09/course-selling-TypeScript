import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());//body-parser => converts data into JSON

app.use(cookieParser());

