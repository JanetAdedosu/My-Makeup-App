const pool = mysql.createPool({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "database",
  multipleStatements: true,
  connectionLimit: 10, // Adjust based on your needs
});

module.exports = async function db(query) {
  // Use the pool instead of creating a new connection
  const results = {
    data: [],
    error: null
  };
  let promise = await new Promise((resolve, reject) => {
    pool.getConnection((err, con) => {
      if (err) {
        results.error = err;
        console.log(err);
        reject(err);
        return;
      }

      console.log("Connected!");

      con.query(query, function (err, result) {
        // ... rest of the code
        con.release(); // Release the connection back to the pool
        resolve(results);
      });
    });
  });

  return promise;
};
