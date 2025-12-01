
const express = require("express") ; 
const app = express() ; 
require("dotenv").config() ; 
const PORT = process.env.PORT || 3000 ;   
const apiVersion = process.env.apiVersion ; 
const cors = require("cors") ;  
const morgan = require("morgan") ; 
const routes = require("./src/routes");
const { initPostgres } = require("./src/db/postgreSQL");

app.use(cors()) ; 
app.use(express.json()) ; 
app.use(morgan("dev")) ; 


initPostgres() ;   

app.get("/" , (req , res) => { 
    return res.status(200).json({ status : 200 , message : "Welcome to our telemedicine server"})
})


app.use(apiVersion , routes) ; 

app.listen(PORT , () => { 
    console.log(`Server is listening on PORT ${PORT}`) ; 
})