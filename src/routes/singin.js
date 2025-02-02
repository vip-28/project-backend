import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config/secrets.js";

const signinrouter = express.Router();

signinrouter.post("/api",async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // db call for user
    // const user = await 
    const passwordcheck = await bcrypt.compare(password, user.password);
    if(user && passwordcheck){
        const token = jwt.sign({
            //payload
            email
        },JWT_SECRET);

        res.cookie('token',token);
        res.json({
            message:"signed in"
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect input"
        })
    }
})

export default signinrouter;