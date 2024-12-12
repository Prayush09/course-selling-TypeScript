import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());//body-parser => converts data into JSON

app.use(cookie-parser)