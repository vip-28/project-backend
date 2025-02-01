import express from "express";
import { createCode } from "../controllers/teacherController.js";

const teacherRouter= express.Router();


teacherRouter.post("/generateCode/:num", createCode )


export default teacherRouter;