// import pool from "../config/db";
import bcrypt from "bcrypt";
import express from "express";
import { getSecID } from "../controllers/teacherController.js";
import { studentSign } from "../models/studentModel.js";
import { checkCode, expiryofCode, teacherSign } from "../models/teacherModel.js";

const signuprouter = express.Router();

signuprouter.post("/student/api", async (req,res) => {
    try{
    const {name , password, email,roll_no,sec,year}= req.body;
        // const name = req.body.name;
        // const password = req.body.password;
        // const email = req.body.email;
        // const roll_no= req.body.roll_no;
        // const sec= req.body.sec;
        // const year= req.body.year;

        const sec_id= getSecID(sec);
console.log(req.body)

if (!email.endsWith("@ietdavv.edu.in")) {
    return res.status(403).json({ message: "Invalid email domain for students" });
  }

                            
        const hashedpassword = await bcrypt.hash(password,10);

        //db call to create
        
        await studentSign(name,
            hashedpassword,
            email,
            roll_no,
            sec_id,
            year)
        
        // await pool.query()
        res.json({
            message: "signup success"
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({ err });
    }
})

signuprouter.post("/teacher/api", async (req,res) => {
    try{
    const {name , password, email, code}= req.body;
    if (!email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
        return res.status(403).json({ message: "Invalid email domain for teachers" });
      }
    
                            
        const hashedpassword = await bcrypt.hash(password,10);

        //db call to create
        const codeCheck=await checkCode(code);
        if(!codeCheck ){
            return res.status(400).json({ message: "Invalid code" });
            
        }
        if(codeCheck){
            if(codeCheck.status==='expired'){
                return res.status(400).json({ message: "Code has expired" });
            }
        }
        await expiryofCode(code);
        
        
        
        await teacherSign(name , hashedpassword, email)
        
        // await pool.query()
        res.json({
            message: "signup success"
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({ err });
    }
})

export default signuprouter;