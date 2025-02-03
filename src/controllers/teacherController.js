import { genCode } from "../utilities/genCode.js";
import redisClient from "../config/cacheDb.js";

import { createCodeService, dateAdd, getAttendanceService } from "../models/teacherModel.js";

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
    console.log(req.params); // Debugging
    const { year, sec, num } = req.params;

    let arr = genCode(num);

    for (const e of arr) {
      const key = `${year}:${sec}:${e}`;

      pipeline.setEx(key, 60, e);
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
    console.log(sec_id);
    
    const date = GenDate(new Date());

    await dateAdd(date, sec_id);
    res.send({ message: "Success" });
  } catch (err) {
    console.log(err);

    next(err);
  }
};


export const getAttendance= async ( req, res,next)=>{
  try{
    const {sec,sub,year} = req.params;
    const result= await getAttendanceService(sec,sub,year);
    res.send(result)
  }catch(err){
    console.log(err);

    next(err);
  }
}