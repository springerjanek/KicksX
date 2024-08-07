const fs = require("fs");
const pg = require("pg");

const config = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_DB_PORT,
  database: process.env.POSTGRES_DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const pool = new pg.Pool(config);

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
