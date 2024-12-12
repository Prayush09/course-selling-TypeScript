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

const courseSchema = new Schema({
     title: {
        type: String,
        required: true
     },

     description: {
        type: String,
        required: true
     },

     imageURL: {
        type: String,
        required: true,
     },

     price: {
        type: String,
        required: true
     },

     creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'adminModel'
     }
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);

