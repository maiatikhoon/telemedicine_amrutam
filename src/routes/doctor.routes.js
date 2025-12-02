

const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { createDoctor, getDoctorById, listAllDoctos, updateDoctor, removeDoctor } = require("../controllers/doctor.controller");

const doctorRoutes = express.Router();

doctorRoutes.post("/create", verifyToken, permit("admin", "doctor"), createDoctor);
doctorRoutes.get("/:id", verifyToken, getDoctorById); 
doctorRoutes.get("/" ,verifyToken , listAllDoctos) ;  
doctorRoutes.put("/:id" , verifyToken , permit("admin" , "doctor") , updateDoctor );  
doctorRoutes.delete("/:id", verifyToken , permit("admin") , removeDoctor) ; 

module.exports = doctorRoutes; 