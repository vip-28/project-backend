// create type usecase as ENUM('available', 'expired');
// remove this upper line from 
//make sure later on student_id should be not null in attendance for now we are making it nullable for development purposes
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
    total_student INT NOT NULL,
    year_id INT REFERENCES Year(year_id) ON DELETE CASCADE
    
);

CREATE TABLE Subject (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    section_id INT REFERENCES Section(section_id) ON DELETE CASCADE
);

CREATE TABLE Faculty (
    faculty_id SERIAL PRIMARY KEY,
    faculty_name VARCHAR(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE Subject_Faculty (
    subject_id INT REFERENCES Subject(subject_id) ON DELETE CASCADE,
    faculty_id INT REFERENCES Faculty(faculty_id) ON DELETE CASCADE,
    PRIMARY KEY (subject_id, faculty_id)
);

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    roll_no varchar(20) UNIQUE NOT NULL ,
    year_id INT REFERENCES Year(year_id) ON DELETE CASCADE,
    section_id INT REFERENCES Section(section_id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    attendance_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Student(student_id) ON DELETE CASCADE,
    subject_id INT REFERENCES Subject(subject_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status CHAR(1) NOT NULL DEFAULT 'A' CHECK (status IN ('P', 'A')),
    section_id INT REFERENCES Section(section_id) ON DELETE CASCADE,
    created_at timestamp default current_timestamp,
    UNIQUE(student_id,subject_id,section_id,date)
);

CREATE INDEX date ON Attendance(student_id, subject_id, date);

create type usecase as ENUM('available', 'expired');

create table inviteCodes(
codes varchar(255) PRIMARY KEY,
status usecase DEFAULT 'available' NOT NULL
);


INSERT INTO invitecodes(codes) VALUES 
('OeMKEdQ6'), ('2GKRNw6L'), ('L6VgUZuz'), ('vXWbT64r'), ('0OY6NfKR'), ('m37ictGi'), ('gXpdoGZ9'), ('lrs1Kg6O'), 
('7D6eEnyi'), ('iSlvaHeU'), ('QznanTGD'), ('SNgkA814'), ('IdgxrCDI'), ('c1Fj3HkL'), ('8mj4yyoH'), ('LGsKGBVE'), 
('k4Jto74r'), ('9nnBXKRV'), ('tNxPVRHS'), ('sypklgW9'), ('57BWziq3'), ('G1vRFFrY'), ('eCIQtYu4'), ('COYRjIsI'), 
('pvC4aFUT'), ('uESyAUZy'), ('zmVZNw8i'), ('hPqZebyx'), ('Th4242vJ'), ('q0gSF3l1'), ('88n7r19l'), ('iIbIH7dg'), 
('L70LqzKY'), ('Qqv3TQis'), ('PsikQ89X'), ('AlAw7G65'), ('GdXChUUw'), ('T3MZGeEp'), ('WyAKMHtY'), ('rugBfw9z'), 
('WU3nq94V'), ('RbGbGya7'), ('hlXXrIPi'), ('40Qn50tO'), ('HIYWugPM'), ('ENmZZJI9'), ('Sqijm3Qd'), ('DTkd1OwL'), 
('cj5lm68s'), ('cCuJjPKU'), ('liUSl65Q'), ('cHzFZIfP'), ('fK1QBoNO'), ('ERj0859v'), ('a3kTWCVn'), ('10AHrORd'), 
('g77TgsRc'), ('heTAyWU8'), ('w5U1kyPm'), ('ghQJCfwj'), ('Fl5n4fLj'), ('4l1JwCBB'), ('YIexv4OW'), ('R6ssxfcv'), 
('z4BFg5DK'), ('zoOaQfer'), ('exBSPYMv'), ('CZe9m1bZ'), ('zaA37lh6'), ('fHQM7Bf4'), ('tC3ySIAi'), ('V8hcJaoO'), 
('EFakbnCU'), ('SXmtOJxK'), ('6oSmTLcn'), ('lXwKbkEX'), ('aAUBfIhB'), ('49xahQQ7'), ('ErIwebpj'), ('S8DT2IOH'), 
('pCpEJRNw'), ('2dUpJ6gz'), ('dkDCyjqg'), ('MZRFWIuf'), ('ua726ZT3'), ('bWFZLNor'), ('sUjQAS7L'), ('nZCApAFC'), 
('CIrlKi2Q'), ('B0LdyrFZ'), ('f0FMcaPD'), ('nJljvmp1'), ('SzxZSVFW'), ('t0sdNbsU'), ('OYKm31yj'), ('5VEyQNP7'), 
('ocmYqzwt'), ('eQwMuQYB'), ('a33BlcXZ'), ('elTCsTyZ'), ('GVZsWH5P'), ('3lUrgWoZ'), ('PhTk9t0h'), ('7donmyOF'), 
('hyNdtRsR'), ('Y52jlLiU'), ('OBX3dKRR'), ('gZRvBXbb'), ('te23OJnK'), ('ArhMlxnb'), ('wgWigkD6'), ('57i4ARki'), 
('BtsOYG8A'), ('LlY1mn0S'), ('zsznBcNE'), ('KznU2B0q'), ('2C4jNnAp'), ('dxVnbRYW'), ('57ZqdXxf'), ('3sql12W9'), 
('1SD6rdLa'), ('OZcKagkb'), ('BPvYJkHa'), ('3s9nCtOD'), ('K9KmrrLi'), ('Mzu8xvva'), ('NPejkYi8'), ('HqiWe74H'), 
('QK9DGymB'), ('8T31pm0H'), ('XmjEmNCl'), ('hnSDuNBZ'), ('0uF0a1qG'), ('qqmoJORQ'), ('qGSKInDk'), ('KOmlaVJZ'), 
('VlRlGYq0'), ('cffHop3c'), ('jJVneVyM'), ('jBKJ5lf6'), ('5Z9gDcAs'), ('61zCV54h'), ('9cOBHN7p'), ('sAPqe1GC'), 
('2wYHty2n'), ('Jmec2eKS'), ('KFbFzQqt'), ('fYbhD7v4'), ('jBRbgRL4'), ('VWBCc8FM');


INSERT INTO Year (year_name) VALUES ('First Year'), ('Second Year'), ('Third Year'), ('Fourth Year');

INSERT INTO SECTION (section_name, year_id, total_student) values
('CSA',2,90), ('CSB',2,85), ('ITA',2,82), ('ITB',2,81), ('ETCA',2,80), ('ETCB',2,80),('EI',2,78),('MECH',2,70),('CIVIL',2,68);

INSERT INTO Subject (subject_name, section_id) VALUES 
('Discrete Structures',1),('Discrete Structures',2), ('Operating Systems',1), ('Operating Systems',2), ('Machine Learning',1), ('Machine Learning',2), ('Database Management System',1), ('Database Management System',2), ('Computer Graphics',1), ('Computer Graphics',2), ('Engineering Economics',1), ('Engineering Economics',2) ;




`

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