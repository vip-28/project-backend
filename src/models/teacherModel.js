import pool from "../config/db.js";


export const createCodeService = async (code) => {
    const result= await pool.query("INSERT INTO UNIQUECODES(code) VALUES ($1)",[code])
    return result.rows[0];
  };