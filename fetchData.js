import connection from "./db-config.js";

const query = "SELECT * FROM Restrooms";

connection.query(query, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
