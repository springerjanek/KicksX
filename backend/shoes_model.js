const Pool = require("pg").Pool;

console.log(
  process.env.POSTGRES_DB_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_DB_PASSWORD,
  process.env.POSTGRES_HOST,
  process.env.POSTGRES_DB_PORT
);

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB_NAME}`;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

// const pool = new Pool({
//   database: process.env.POSTGRES_DB_NAME,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_DB_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_DB_PORT,
// });

console.log(pool);
const getAllShoes = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM shoes ORDER BY id ASC", (error, results) => {
      console.log(results);
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
