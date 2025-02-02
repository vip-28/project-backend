import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import teacherRouter from "./routes/teacher.js";
import studentRouter from "./routes/student.js";

import cookieParser from "cookie-parser";
import signinrouter from "./routes/singin.js";
import signuprouter from "./routes/signup.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3004"
}));

const port = process.env.PORT || 3004;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/teacher",teacherRouter);
app.use("/student", studentRouter);
app.use("/user/signin",signinrouter);
app.use("/user/signup", signuprouter);

//error handling


//create table 



//testing postgress connection
app.get("/", async (req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("result", result.rows);
    res.send(`The database name is : ${result.rows[0].current_database}`);
  });


//server
app.listen(port, () => {
  console.log("server running on " + port);
});