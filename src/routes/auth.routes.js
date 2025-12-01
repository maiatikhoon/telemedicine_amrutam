
const express = require("express") ; 
const { registerUser } = require("../controllers/auth.controller");

const authRoutes = express.Router() ; 

authRoutes.get("/register" , registerUser) ; 


module.exports = authRoutes ; 