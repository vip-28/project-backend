import express from "express";
import { checkAttendance, markAttendance, recentAttendance } from "../controllers/studentController.js";
import { middleauth, studentAuth } from "../middlewares/authmiddleware.js";

const studentRouter= express.Router();


studentRouter.post("/markAttendance/:code/:id/:sub_id",middleauth, studentAuth,markAttendance)

studentRouter.get("/checkAttendance/:id/:sub_id",middleauth,studentAuth,checkAttendance)

studentRouter.get("/recentAttendance/:id",middleauth,studentAuth,recentAttendance)


export default studentRouter;