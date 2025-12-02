

const express = require("express") ; 
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { createPayment, listAllPayments, getPaymentById, getByConsultationId, updatePayment, deletePayment } = require("../controllers/payment.controller");

const paymentRoutes = express.Router() ; 


paymentRoutes.post("/" , verifyToken , permit("user") , createPayment) ; 
paymentRoutes.get("/" , verifyToken , permit("user" , "admin") , listAllPayments) ; 
paymentRoutes.get("/:id" , verifyToken , permit("user" , "admin", "doctor") , getPaymentById) ;  
paymentRoutes.get("/consultation/:id" , verifyToken , permit("user" , "admin", "user") , getByConsultationId)  ;  
paymentRoutes.put("/:id" , verifyToken , permit("admin") , updatePayment) ; 
paymentRoutes.delete("/:id" , verifyToken , permit("admin") , deletePayment) ; 


module.exports = paymentRoutes ; 