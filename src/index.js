import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import teacherRouter from "./routes/teacher.js";


dotenv.config();

const app = express();

const port = process.env.PORT || 3004;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/teacher",teacherRouter);

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