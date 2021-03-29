const Pool = require('pg').Pool
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})


const getGrades = (request, response) => {
    pool.query('SELECT * FROM get_grados()', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getStudents = (request, response) => {
    pool.exec
    pool.query('SELECT * FROM grado ORDER BY orden ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  

module.exports = {
    getGrades,
}