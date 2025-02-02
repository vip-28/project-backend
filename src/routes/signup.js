import pool from "../config/db";
import bcrypt from "bcrypt";
import express from "express";

const signuprouter = express.Router();

signuprouter.post("/api", async (req,res) => {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const hashedpassword = await bcrypt.hash(password,10);

        //db call to create
        // await pool.query()
        res.json({
            message: "signup success"
        })
})

export default signuprouter;