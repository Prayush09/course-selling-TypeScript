import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

// Middleware to authenticate JWT token
function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    
    try {
        if(process.env.JWT_User_Password){
            const decoded = jwt.verify(token, process.env.JWT_User_Password);
        req.userId = decoded.id; // Attach user id to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default userMiddleware;