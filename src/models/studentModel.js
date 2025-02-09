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

export const studentLogin = async (email) => {
  const result = await pool.query(
    `
    select * from student where email=$1 `,
    [email]
  );

  return result.rows[0];
};



export const checkAttendanceService= async(id, sub)=>{
  const result= await pool. query(`select * from attendance where student_id=$1 and subject_id=$2 order by created_at desc limit 10;
`,[id,sub])
return result.rows;
}

export const getTotalAttendance= async(id, sub)=>{
  const result= await pool. query(`select Count(status) from attendance where status='P' and student_id=$1 and subject_id=$2;`,[id,sub])
return result.rows[0];
}


export const recentAttendanceService= async(id)=>{
  const result= await pool.query(`select a.subject_id,subject_name,s.student_id,attendance_id,status,s.section_id,created_at,year_id,student_name from attendance as a, student as s, subject as sub  where 
s.student_id=a.student_id and a.subject_id=sub.subject_id and s.student_id=$1  order by created_at desc limit 10`,[id])
  return result.rows;

}


