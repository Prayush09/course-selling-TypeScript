"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseModel = exports.courseModel = exports.adminModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Types.ObjectId;
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String
});
const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String
});
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'adminModel'
    }
});
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});
exports.userModel = mongoose_1.default.model("user", userSchema);
exports.adminModel = mongoose_1.default.model("admin", adminSchema);
exports.courseModel = mongoose_1.default.model("course", courseSchema);
exports.purchaseModel = mongoose_1.default.model("purchase", purchaseSchema);
