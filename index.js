const express = require('express')
const db = require('./database/queries')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/grados', db.getGrades)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    console.log(process.env.DB_USER)
})