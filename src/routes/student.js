import express from "express";
import { checkAttendance, markAttendance, recentAttendance } from "../controllers/studentController.js";
import { middleauth, studentAuth } from "../middlewares/authmiddleware.js";

const studentRouter= express.Router();


studentRouter.post("/markAttendance",middleauth, studentAuth,markAttendance)

studentRouter.get("/checkAttendance",middleauth,studentAuth,checkAttendance)

studentRouter.get("/recentAttendance/:id",middleauth,studentAuth,recentAttendance)


export default studentRouter;