import express from "express";
import { createCode, getAttendance } from "../controllers/teacherController.js";
import { middleauth, teacherAuth } from "../middlewares/authmiddleware.js";

const teacherRouter= express.Router();


teacherRouter.post("/generateCode/:year/:sec/:sub/:num", middleauth,teacherAuth,createCode )   

teacherRouter.get("/getAttendance/:year/:sec/:sub", middleauth,teacherAuth,getAttendance )



export default teacherRouter;