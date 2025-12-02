const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");


module.exports.verifyToken = async (req, res, next) => {

     try {
          const token = req.headers.authorization.split(" ")[1];

          if (!token) {
               throw new AppError(400, "Token is missing");
          }

          const decoded = await jwt.verify(token, process.env.JWT_SECRET);
          const db = getDB();

          const user = await db.User.findByPk(decoded.id, { attributes: ['id', 'email', 'role'] });

          if (!user) {
               throw new AppError(401, "User not found");
          }

          req.user = user;

          next();


     } catch (error) {
          console.log("Auth Error", error.message);
          return res.status(200).json({ status: 401, message: "Authentication Failed" });
     }
}