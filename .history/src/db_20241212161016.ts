import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String
})