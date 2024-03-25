import mysql, { Pool, ConnectionOptions } from "mysql2/promise";
import { config } from "../../config";

// Create a connection pool
const pool: Pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
});

export const runQuery = async (
  query: string,
  values: any[] | null
): Promise<any> => {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Execute the query
    const [rows, fields] = await conn.execute(query, values);

    console.log("Result rows", rows);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    return error;
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const runInsert = async (sql: string, values: any[]) => {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Execute the insert query
    const [result] = await conn.execute(sql, values);

    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    return error;
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const runUpdate = async (sql: string, values: any[]) => {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Execute the update query
    const [result] = await conn.execute(sql, values);

    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    return error;
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};
