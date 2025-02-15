import { genCode } from "../utilities/genCode.js";
import redisClient from "../config/cacheDb.js";

import { createCodeService, dateAdd, getAttendanceService } from "../models/teacherModel.js";
import pool from "../config/db.js";

const GenDate = (date) => {
  const isoString = date.toISOString();
  const formattedDate = isoString.split("T")[0];
  return formattedDate;
};

export const getSecID = (sec) => {
  if (sec == "CSA") {
    return 1;
  }
  if (sec == "CSB") {
    return 2;
  }
  if (sec == "ITA") {
    return 3;
  }
  if (sec == "ITB") {
    return 4;
  }
  if (sec == "ETCA") {
    return 5;
  }
  if (sec == "ETCB") {
    return 6;
  }
  if (sec == "EI") {
    return 7;
  }
  if (sec == "MECH") {
    return 8;
  }
  if (sec == "CIVIL") {
    return 9;
  }
};

const pipeline = redisClient.multi();

export const createCode = async (req, res, next) => {
  try {

    console.log("recieved data",req.body); // Debugging
    const { year, sec, num,subject } = req.body;

    let arr = genCode(num);

    for (const e of arr) {
      const key = `${year}:${sec}:${e}`;

      pipeline.setEx(key, 600, e);
    }
    await pipeline.exec();

    for (const e of arr) {
      await createCodeService(e, year, sec);
    }
    //    arr.map( async (e)=>{
    //         // const key = `attendance_code:${studentId}`;

    //         // await redisClient.setEx(key, 600, num);
    //         createCodeService(e);
    //     })
    const sec_id = getSecID(sec);
    if (!sec_id) return res.status(400).json({ error: "Invalid section" });
    console.log(sec);
    
    console.log(sec_id);
    const result1= await pool.query(
      `select subject_id from subject where section_id=$1 and subject_name=$2;`,
      [sec_id, subject]
    );
    if (result1.rows.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }
  const sub = result1.rows[0].subject_id;
    
    const date = GenDate(new Date());

    await dateAdd(date, sec_id,sub);
    res.send({ message: "Success", code:arr[0] });
  } catch (err) {
    console.log(err);

    next(err);
  }
};


export const getAttendance= async ( req, res,next)=>{
  try{
    const {sec,subject,year} = req.body;
    const sec_id = getSecID(sec);

    console.log(req.body);
    

    const result1= await pool.query(
      `select subject_id from subject where section_id=$1 and subject_name=$2;`,
      [sec_id, subject]
    );
  const sub = result1.rows[0].subject_id;
console.log(sec_id+ " "+ sub + " "+ year);

    const result= await getAttendanceService(sec_id,sub,year);
    res.send(result)
  }catch(err){
    console.log(err);

    next(err);
  }
}