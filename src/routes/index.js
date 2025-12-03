
const express = require("express") ; 
const authRoutes = require("./auth.routes");
const doctorRoutes = require("./doctor.routes");
const { handlePagination } = require("../utils/handlePagination");
const availabilityRoutes = require("./availability.route");
const consultationRoutes = require("./consultation.routes");
const prescriptionRoutes = require("./prescription.routes");
const paymentRoutes = require("./payment.routes");
const auditRoutes = require("./auditlog.routes");

const routes = express.Router() ; 

routes.use(handlePagination) ;
routes.use("/auth", authRoutes)  ; 
routes.use("/doctor" , doctorRoutes) ;  
routes.use("/availablity-slot" , availabilityRoutes) ;  
routes.use("/consultation" , consultationRoutes) ;  
routes.use("/prescription", prescriptionRoutes) ;  
routes.use("/payment" , paymentRoutes) ; 
routes.use("/audit-logs", auditRoutes) ; 

module.exports = routes ; 