const Pool = require("pg").Pool;

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB_NAME}`;
const pool = new Pool({
  connectionString: connectionString,
});

console.log(connectionString);

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
