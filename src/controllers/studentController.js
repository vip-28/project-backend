import redisClient from "../config/cacheDb.js";
import pool from "../config/db.js";
import { markAttendanceService } from "../models/studentModel.js";
import { isWithinRadius } from "../utilities/verifyLocation.js";
const GenDate = (date) => {
  const isoString = date.toISOString();
  const formattedDate = isoString.split("T")[0];
  return formattedDate;
};



// 1	"CSA"	2
// 2	"CSB"	2
// 3	"ITA"	2
// 4	"ITB"	2
// 5	"ETCA"	2
// 6	"ETCB"	2
// 7	"EI"	2
// 8	"MECH"	2
// 9	"CIVIL"	2

const getSec= (sec_id)=>{
    if(sec_id==1){
        return "CSA"
    }
    if(sec_id==2){
        return "CSB"
    }    if(sec_id==3){
        return "ITA"
    }    if(sec_id==4){
        return "ITB"
    }    if(sec_id==5){
        return "ETCA"
    }    if(sec_id==6){
        return "ETCB"
    }    if(sec_id==7){
        return "EI"
    }    if(sec_id==8){
        return "MECH"
    }    if(sec_id==9){
        return "CIVIL"
    }

}

export const markAttendance = async (req, res, next) => {
  try {
    
    const { id, sub_id,code } = req.params;
    const { latitude, longitude } = req.body;
    if(!isWithinRadius(latitude,longitude)){
        return res.status(400).json({message: "You are not present in College Premises"});
    } 

    const date = GenDate(new Date());
    const status = "P";
const section=  await pool.query("select section_id from student where student_id= $1",[id])
const year_res=  await pool.query("select year_id from student where student_id= $1",[id])

const year= year_res.rows[0].year_id;
const sec_id= section.rows[0].section_id;

const sec= getSec(sec_id);

const key = `${year}:${sec}:${code}`

const data = await redisClient.GET(key)
console.log(data);

if(!data){
    return res.send("Wrong Code");
}

const delKey= await redisClient.del(key);



console.log("id: "+id+ " Date:"+ date+ " section "+sec+" "+sec_id+" year "+year+" code "+code+ " sub code"+ sub_id);

    const result = await markAttendanceService(id, sub_id, date,status, sec_id);

    res.send({message: data})

  } catch (err) {
    console.log(err);
    res.status(200).send({message:err.message})
    next(err);
  }
};
