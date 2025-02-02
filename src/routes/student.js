import express from "express";
import { markAttendance } from "../controllers/studentController.js";

const studentRouter= express.Router();


studentRouter.post("/markAttendance/:code/:id/:sub_id", markAttendance)

export default studentRouter;