import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secrets.js";
import redisClient from "../config/cacheDb.js";

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
                console.log(JSON.stringify(decoded));
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


export async function studentAuth(req,res,next){
    const token = req.cookies.token;
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const key=decodedObj.email
    const cacheData= await redisClient.get(key);
    if(cacheData){
        const userObject=JSON.parse(cacheData);
        if(userObject.role!='Student'){
            res.status(401).send({
                message:"Wrong role"
            })
        }else{
            req.user=userObject;
            next();
        }
    }else{
        res.status(401).send({
            message:"Session expired"
            })

    }



}

export async function teacherAuth(req,res,next){
    const token = req.cookies.token;
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const key=decodedObj.email
    const cacheData= await redisClient.get(key);
    if(cacheData){
        const userObject=JSON.parse(cacheData);
        if(userObject.role!='Teacher'){
            res.status(401).send({
                message:"Wrong role"
            })
        }else{
            req.user=userObject;
            next();
        }
    }else{
        res.status(401).send({
            message:"Session expired"
            })

    }



}