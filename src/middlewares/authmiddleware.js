import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secrets";

export function middleauth(req,res,next) {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({
                    message: "Unauthorized"
                })
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
    else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}