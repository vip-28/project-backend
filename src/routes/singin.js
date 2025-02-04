import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secrets.js";
import { studentLogin } from "../models/studentModel.js";
import { teacherLogin } from "../models/teacherModel.js";

const signinrouter = express.Router();

signinrouter.post("/student/api",async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        // db call for user
        const user= await studentLogin(email);
        console.log(user);
        
    
        // const user = await 
        const passwordcheck = await bcrypt.compare(password, user?.password);
        
        if(user && passwordcheck){
            const token = jwt.sign({
                //payload
                email
            },JWT_SECRET);
    
            res.cookie('token',token);
            res.json({
                message:user
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect input"
            })
        }
    }catch(err){
        res.status(401).send({message:"WRONG CREDENTIALS"});
    }
    
    
})

signinrouter.post("/teacher/api",async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
    
        // db call for user
        const user= await teacherLogin(email);
        console.log(user);
        
    
        // const user = await 
        const passwordcheck = await bcrypt.compare(password, user?.password);
        
        if(user && passwordcheck){
            const token = jwt.sign({
                //payload
                email
            },JWT_SECRET);
    
            res.cookie('token',token);
            res.json({
                message:user
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect input"
            })
        }
    }catch(err){
        res.status(401).send({message:"WRONG CREDENTIALS"});
    }
    
})

export default signinrouter;