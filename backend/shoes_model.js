const { Pool } = require("pg");
var fs = require("fs");



const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
  ssl: {
    ca: fs.readFileSync("./prod-ca-2021.crt").toString()
  }
});

pool.connect();

const getAllShoes = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM shoes ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getSpecificShoeById = (shoeId) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(shoeId);
    pool.query("SELECT * FROM shoes WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getSpecificShoeByName = (shoeName) => {
  console.log(shoeName);
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM shoes WHERE name='${shoeName}'`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = { getAllShoes, getSpecificShoeById, getSpecificShoeByName };
