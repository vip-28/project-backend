import { genCode } from "../utilities/genCode.js";
import redisClient from "../config/cacheDb.js";

import { createCodeService } from "../models/teacherModel.js";

const pipeline = redisClient.multi();

export const createCode = async (req, res, next) => {
  try {
    console.log(req.params); // Debugging
    const { year, sec, num } = req.params;

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

    res.send({ message: "Success" });
  } catch (err) {
    next(err);
  }
};
