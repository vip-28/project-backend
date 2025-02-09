import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secrets.js";
import { studentLogin } from "../models/studentModel.js";
import { teacherLogin } from "../models/teacherModel.js";
import redisClient from "../config/cacheDb.js";

const signinrouter = express.Router();

signinrouter.post("/student/api",async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        if (!email.endsWith("@ietdavv.edu.in")) {
            return res.status(403).json({ message: "Invalid email domain for students" });
          }
        
    
        // db call for user
        const user= await studentLogin(email);
        if(!user){
            return res.status(403).json({message:"No Such User"});
        }
        
    
        // const user = await 
        const passwordcheck = await bcrypt.compare(password, user?.password);
        
        if(user && passwordcheck){
            const token = jwt.sign({
                //payload
                email
            },JWT_SECRET);
    
            res.cookie('token',token,{ httpOnly: true, secure: true, sameSite: 'Strict' }

                
            );
            const save={
                email:user?.email,
                roll_no:user?.roll_no,
                section_id:user?.section_id,
                student_id:user?.student_id,
                name: user?.student_name,
                year:user?.year_id,
                role:"Student"
            }
            const cache= await redisClient.setEx(email,3600,JSON.stringify(save));
            res.json({
                message:{
                    email:user?.email,
                    roll_no:user?.roll_no,
                    section_id:user?.section_id,
                    student_id:user?.student_id,
                    name: user?.student_name,
                    year:user?.year_id,
                    role:"Student"
                }
            })
        }
        else{
            res.status(403).json({
                message: "Incorrect input"
            })
        }
    }catch(err){
        res.status(401).send({message:err.message});
    }
    
    
})

signinrouter.post("/teacher/api",async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
    

        if (!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
            return res.status(403).json({ message: "Invalid email domain for teachers" });
          }
        
        // db call for user
        const user= await teacherLogin(email);
        console.log(user);

        const save={
            email:user?.email,
            name:user?.faculty_name,
            id:user?.faculty_id,
            role:"Teacher"

        }
        const cache= await redisClient.setEx(email,600,JSON.stringify(save));
        
    
        // const user = await 
        const passwordcheck = await bcrypt.compare(password, user?.password);
        
        if(user && passwordcheck){
            const token = jwt.sign({
                //payload
                email
            },JWT_SECRET);
    
            res.cookie('token',token,{ httpOnly: true, secure: true, sameSite: 'Strict' });
            res.json({
                message:{
                    email:user.email,
                    name:user.faculty_name,
                    faculty_id:user.faculty_id,
                    role:"Teacher",

                }
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


signinrouter.post("/logout", async (req, res) => {

    res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User Logged Out Successful!");

});

export default signinrouter;