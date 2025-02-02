import pool from "../config/db.js";


export const markAttendanceService  = async (id, sub_id, date,status,sec_id) => {
    const result= await pool.query("Insert into attendance(student_id, subject_id,date,status,section_id) values ($1 , $2 , $3 , $4 , $5)",[id,sub_id,date,status,sec_id])
    return result.rows[0];
  };