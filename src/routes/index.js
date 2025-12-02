
const express = require("express") ; 
const authRoutes = require("./auth.routes");
const doctorRoutes = require("./doctor.routes");
const { handlePagination } = require("../utils/handlePagination");
const availabilityRoutes = require("./availability.route");

const routes = express.Router() ; 

routes.use(handlePagination) ;
routes.use("/auth", authRoutes)  ; 
routes.use("/doctor" , doctorRoutes) ;  
routes.use("/availablity-slot" , availabilityRoutes) ; 

module.exports = routes ; 