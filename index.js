const express = require('express')
const db = require('./database/queries')
const path = require('path')
const bodyParser = require("body-parser");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()
const port = process.env.PORT || 3000

app.use(express.json({
  limit: '50mb', 
  extended: true
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'upload')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${uuidv4()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

app.use('/upload',express.static('./upload/'))

app.get('/api/grados', db.getGrades)
app.get('/api/students', db.getStudents)
app.get('/api/payments', db.getPayments)

app.delete('/api/student/delete/:id', db.deleteStudent)

app.post('/api/student/new', upload.single('file'), db.createStudent)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})