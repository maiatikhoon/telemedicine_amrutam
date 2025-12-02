
const express = require("express") ; 
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { createConsultation, listAllConsultation, getConsultationById, cancelConsultation, startConsultation, completeConsultation, bookConsultation } = require("../controllers/consultation.controller");

const consultationRoutes = express.Router() ; 

consultationRoutes.post("/" , verifyToken , permit("user") , bookConsultation) ; 
consultationRoutes.get("/" , verifyToken, permit("user") , listAllConsultation) ;  
consultationRoutes.get("/:id" , verifyToken , permit("user") , getConsultationById) ; 
consultationRoutes.put("/cancel/:id" , verifyToken , permit("user") , cancelConsultation) ; 
consultationRoutes.put("/start/:id" , verifyToken , permit("user") , startConsultation) ;
consultationRoutes.put("/complete/:id" , verifyToken , permit("user") , completeConsultation) ; 

module.exports = consultationRoutes ; 