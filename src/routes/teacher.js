import express from "express";
import { createCode, getAttendance } from "../controllers/teacherController.js";
import { middleauth, teacherAuth } from "../middlewares/authmiddleware.js";

const teacherRouter= express.Router();


teacherRouter.post("/generateCode", middleauth,teacherAuth,createCode )   

teacherRouter.post("/getAttendance", middleauth,teacherAuth,getAttendance )



export default teacherRouter;