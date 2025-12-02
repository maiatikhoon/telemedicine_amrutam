const AppError = require("../utils/appError");

module.exports.permit = (...allowedRoles) => {

    return (req, res, next) => {

        try {

            if (!req.user) {
                throw new AppError(401, "User not Authenticated , Login Again");
            }

            if(allowedRoles.length==0) { 
                return next() ; 
            }

            const { role } = req.user;

            if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
                throw new AppError(403, "Access Denied")
            } 

            next() ; 

        } catch (error) {
            console.log("permit error ", error.message);
            return res.status(200).json({ status: 500, message: "Authorization failed" });
        }
    }
}