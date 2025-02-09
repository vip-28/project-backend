import redisClient from "../config/cacheDb.js";
import pool from "../config/db.js";
import {
  checkAttendanceService,
  getTotalAttendance,
  markAttendanceService,
  recentAttendanceService,
} from "../models/studentModel.js";
import { isWithinRadius } from "../utilities/verifyLocation.js";
const GenDate = (date) => {
  const isoString = date.toISOString();
  const formattedDate = isoString.split("T")[0];
  return formattedDate;
};
import jwt from "jsonwebtoken";

// 1	"CSA"	2
// 2	"CSB"	2
// 3	"ITA"	2
// 4	"ITB"	2
// 5	"ETCA"	2
// 6	"ETCB"	2
// 7	"EI"	2
// 8	"MECH"	2
// 9	"CIVIL"	2

const getSec = (sec_id) => {
  if (sec_id == 1) {
    return "CSA";
  }
  if (sec_id == 2) {
    return "CSB";
  }
  if (sec_id == 3) {
    return "ITA";
  }
  if (sec_id == 4) {
    return "ITB";
  }
  if (sec_id == 5) {
    return "ETCA";
  }
  if (sec_id == 6) {
    return "ETCB";
  }
  if (sec_id == 7) {
    return "EI";
  }
  if (sec_id == 8) {
    return "MECH";
  }
  if (sec_id == 9) {
    return "CIVIL";
  }
};

export const markAttendance = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: " + JSON.stringify(decodedObj));

    const { student_id, subject, code,section,year } = req.body;
    const { latitude, longitude } = req.body;
    if (!isWithinRadius(latitude, longitude)) {
      console.log("Not near Location");
      
      return res
        .status(400)
        .json({ message: "You are not present in College Premises" });
    }

    
    

    const result1 = await pool.query(
      `SELECT subject_id 
         FROM subject 
         JOIN student ON subject.section_id = student.section_id 
         WHERE student.student_id = $1
         AND subject.subject_name = $2`,
      [student_id, subject]
    );
    // console.log(result1.rows[0]+" "+student_id+" "+subject);
    
    const sub_id = result1.rows[0].subject_id; 
    if(!sub_id){
      return res.json
    }
// console.log(sub_id);

    // console.log(result1);
    // console.log(sub_id);
    const date = GenDate(new Date());
    const status = "P";
    // const section = await pool.query(
    //   "select section_id from student where student_id= $1",
    //   [student]
    // );
    // const year_res = await pool.query(
    //   "select year_id from student where student_id= $1",
    //   [id]
    // );
    // const section

    // const year = year_res.rows[0].year_id;


    const sec_id = section;//psql

    const sec = getSec(sec_id);//redis
    console.log(sec);
    console.log(year);
    
    

    const key = `${year}:${sec}:${code}`;
console.log(key);

    const data = await redisClient.GET(key);
    console.log(data);

    if (!data) {
      return res.send("Wrong Code");
    }

    const delKey = await redisClient.del(key);

    console.log(
      "id: " +
        student_id +
        " Date:" +
        date +
        " section " +
        sec +
        " " +
        sec_id +
        " year " +
        year +
        " code " +
        code +
        " sub code" +
        sub_id
    );

    const result = await markAttendanceService(
      student_id,
      sub_id,
      date,
      status,
      sec_id
    );

    res.send({ message: data });
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: err.message });
    next(err);
  }
};

export const checkAttendance = async (req, res, next) => {
  try {
    const { id, subject } = req.body;
    const result1= await pool.query(
        `SELECT subject_id 
           FROM subject 
           JOIN student ON subject.section_id = student.section_id 
           WHERE student.student_id = $1
           AND subject.subject_name = $2`,
        [id, subject]
      );
    const sub_id = result1.rows[0].subject_id; 
    console.log(sub_id);
    


    const result = await checkAttendanceService(id, sub_id);
    const total_attended = await getTotalAttendance(id, sub_id);
    res.send({ data: result, total: total_attended });
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: err.message });
    next(err);
  }
};

export const recentAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await recentAttendanceService(id);
    res.send({
      message: result,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: err.message });
    next(err);
  }
};
