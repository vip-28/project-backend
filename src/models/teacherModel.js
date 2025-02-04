import pool from "../config/db.js";


export const createCodeService = async (code,year,sec) => {
    const result= await pool.query("INSERT INTO UNIQUECODES(code, year, section) VALUES ($1, $2, $3)",[code,year,sec])
    return result.rows[0];
  };


  export const dateAdd= async (date,sec_id,sub)=>{
    const result= await pool.query("Insert into attendance(date,section_id,subject_id) values($1, $2,$3)",[date,sec_id,sub]);
    return result.rows[0];
  }


  export const getAttendanceService= async (sec,sub,year)=>{
    const result= await pool.query(`  SELECT 
    s.student_id, 
    s.student_name, 
    COUNT(a.date) AS attended_classes, 
    (COUNT(a.date) * 100.0 / 
         NULLIF(
            (SELECT COUNT(DISTINCT date) 
             FROM attendance 
             WHERE section_id = $1 AND subject_id = $2), 
            0
        )
    ) AS attendance_percentage
FROM student s
LEFT JOIN attendance a 
    ON s.student_id = a.student_id 
    AND a.status = 'P'
    AND a.subject_id = $2  -- Ensures we count attendance for the given subject only
WHERE s.section_id = $1 AND s.year_id=$3
GROUP BY s.student_id, s.student_name
ORDER BY s.student_id;
`,[sec,sub,year])
return result.rows;
  }


  export const teacherSign = async (
    name , password, email
  ) => {
    const result = await pool.query(
      "Insert into faculty(faculty_name,email,password) values ($1, $2, $3)",
      [name, email, password]
      
    );
    return result.rows[0];
  };


  export const teacherLogin = async (email) => {
    const result = await pool.query(`
      select * from faculty where email=$1 `,[email]);
  
      return result.rows[0];
  };
  
  export const checkCode= async(code)=>{
    const result= await pool.query(`select * from invitecodes where codes=$1 `,[code])
    return result.rows[0];
  }

  export const expiryofCode= async(code)=>{
    const result= await pool.query(`update invitecodes set status='expired' where codes=$1;`,[code])
    return result.rows[0];
  }