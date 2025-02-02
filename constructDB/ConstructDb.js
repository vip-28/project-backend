const query= `CREATE TABLE UNIQUECODES (
  id serial not null,
  code varchar(100),
  status varchar(1) default 'A',
  year varchar(5),
  section varchar(10),
  created_at timestamp default current_timestamp
);



CREATE TABLE Year (
    year_id SERIAL PRIMARY KEY,
    year_name VARCHAR(50) NOT NULL
);

CREATE TABLE Section (
    section_id SERIAL PRIMARY KEY,
    section_name VARCHAR(100) NOT NULL,
    year_id INT REFERENCES Year(year_id) ON DELETE CASCADE
);

CREATE TABLE Subject (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    section_id INT REFERENCES Section(section_id) ON DELETE CASCADE
);

CREATE TABLE Faculty (
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(100) NOT NULL
);

CREATE TABLE Subject_Faculty (
    subject_id INT REFERENCES Subject(subject_id) ON DELETE CASCADE,
    faculty_id INT REFERENCES Faculty(faculty_id) ON DELETE CASCADE,
    PRIMARY KEY (subject_id, faculty_id)
);

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    roll_no varchar(20) NOT NULL,
    year_id INT REFERENCES Year(year_id) ON DELETE CASCADE,
    section_id INT REFERENCES Section(section_id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    attendance_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Student(student_id) ON DELETE CASCADE,
    subject_id INT REFERENCES Subject(subject_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A' CHECK (status IN ('P', 'A'))
);

CREATE INDEX date ON Attendance(student_id, subject_id, date);`

import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const {Pool}=pkg;


const DB_USER= "postgres"
const DB_HOST="localhost"
const DB_DATABASE="sample-db"
const DB_PORT= 5432
const DB_PASSWORD= "user"

const pool= new Pool({
    user:DB_USER,
    host:DB_HOST,
    database:DB_DATABASE,
    password:DB_PASSWORD,
    port:DB_PORT,
})

pool.on("connect",()=>{
    console.log("Connection Pool Established with DB");
    
})

const constructDB= async ()=>{
    const result = await pool.query(query);
    console.log(result);
}

constructDB();