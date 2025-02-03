import pool from "../config/db.js";

export const markAttendanceService = async (
  id,
  sub_id,
  date,
  status,
  sec_id
) => {
  const result = await pool.query(
    "Insert into attendance(student_id, subject_id,date,status,section_id) values ($1 , $2 , $3 , $4 , $5)",
    [id, sub_id, date, status, sec_id]
  );
  return result.rows[0];
};

export const studentSign = async (
  name,
  password,
  email,
  roll_no,
  sec,
  year
) => {
  const result = await pool.query(
    "Insert into student(student_name, roll_no,year_id,section_id,email,password) values ($1, $2, $3, $4, $5, $6)",
    [name, roll_no, year, sec, email, password]
    
  );
  return result.rows[0];
};
