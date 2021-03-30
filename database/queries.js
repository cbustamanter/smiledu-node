const Pool = require("pg").Pool;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const getGrades = (request, response) => {
  pool.query("SELECT * FROM get_grados()", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getStudents = (request, response) => {
  pool.query("SELECT * FROM get_persona()", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPayments = (request, response) => {
  pool.query("SELECT * FROM get_pagos()", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteStudent = (request, response) => {
  const query = "call delete_persona($1)";
  const value = [request.params.id];
  pool.query(query, value, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


const createStudent = async (request, response) => {
  const bodyObject= JSON.parse(request.body.student)  
  const query = "call create_persona($1, $2, $3, $4, $5, $6)";
  const nom_persona = bodyObject.nom_persona;
  const ape_pate_pers = bodyObject.ape_pate_pers;
  const ape_mate_pers = bodyObject.ape_mate_pers;
  const nid_grado = bodyObject.nid_grado;
  const fecha_naci = bodyObject.fecha_naci;
  let foto_ruta;
  if (request.file) {
    foto_ruta = `${request.file.destination}/${request.file.filename}`;
  }  
  const values = [
    nom_persona,
    ape_pate_pers,
    ape_mate_pers,
    nid_grado,
    fecha_naci,
    foto_ruta,
  ];
  pool.query(query, values, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(foto_ruta);
  });
}

module.exports = {
  getGrades,
  getStudents,
  deleteStudent,
  createStudent,
  getPayments,
};
