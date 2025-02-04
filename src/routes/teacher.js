import express from "express";
import { createCode, getAttendance } from "../controllers/teacherController.js";

const teacherRouter= express.Router();


teacherRouter.post("/generateCode/:year/:sec/:sub/:num", createCode )

teacherRouter.get("/getAttendance/:year/:sec/:sub", getAttendance )



export default teacherRouter;