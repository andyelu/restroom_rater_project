import mysql from "mysql2";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) throw error;
  console.log("Database connected!");
});

export default connection;
