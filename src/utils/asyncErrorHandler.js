
module.exports.asyncErrorHandler = (fn) => { 
    return (req ,res , next) =>  fn(req , res , next).catch(next) ;
}

module.exports.errorHandler = (err , req , res , next) => { 
     
    err.statusCode = err.statusCode || 500 ; 
    console.error(err.stack) ;  

    return res.status(200).json({ status : err.statusCode , message : err.message || "Internal Server Error"})
}