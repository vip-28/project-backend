// import pool from "../config/db";
import bcrypt from "bcrypt";
import express from "express";
import { getSecID } from "../controllers/teacherController.js";
import { studentSign } from "../models/studentModel.js";
import { teacherSign } from "../models/teacherModel.js";

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
console.log(sec_id)
                            
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
    const {name , password, email}= req.body;

                            
        const hashedpassword = await bcrypt.hash(password,10);

        //db call to create
        
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