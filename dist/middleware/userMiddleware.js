"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    try {
        if (process.env.JWT_User_Password) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_User_Password);
            req.userId = decoded.id;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
exports.default = userMiddleware;
