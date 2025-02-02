import pool from "../config/db.js";


export const createCodeService = async (code,year,sec) => {
    const result= await pool.query("INSERT INTO UNIQUECODES(code, year, section) VALUES ($1, $2, $3)",[code,year,sec])
    return result.rows[0];
  };