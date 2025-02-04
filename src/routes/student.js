import express from "express";
import { checkAttendance, markAttendance } from "../controllers/studentController.js";

const studentRouter= express.Router();


studentRouter.post("/markAttendance/:code/:id/:sub_id", markAttendance)

studentRouter.get("/checkAttendance/:id/:sub_id",checkAttendance)


export default studentRouter;