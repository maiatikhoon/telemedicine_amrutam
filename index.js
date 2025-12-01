
const express = require("express") ; 
const app = express() ; 
require("dotenv").config() ; 
const PORT = process.env.PORT || 3000 ;  
const cors = require("cors") ;  
const morgan = require("morgan") ; 
const connectDatabase = require("./src/config/db");

app.use(cors()) ; 
app.use(express.json()) ; 
app.use(morgan("dev")) ; 


connectDatabase() ; 

app.get("/" , (req , res) => { 
    return res.status(200).json({ status : 200 , message : "Welcome to our telemedicine server"})
})


app.listen(PORT , () => { 
    console.log(`Server is listening on PORT ${PORT}`) ; 
})