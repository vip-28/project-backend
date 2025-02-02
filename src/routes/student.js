import express from "express";

const studentRouter= express.Router();


studentRouter.post("/markAttendance/:id/:sub_id", markAttendance)

export default studentRouter;