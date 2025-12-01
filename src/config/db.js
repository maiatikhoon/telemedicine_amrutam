
const { Sequelize } = require("sequelize"); 

const sequelize = new Sequelize(process.env.POSTGRESQL_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,    
            rejectUnauthorized: false
        }
    },
    logging: false, 
})



async function connectDatabase() {
    try {

        await sequelize.authenticate();
        // associate() ; call it afterwards
        console.log("PostgreSQL connected successfully"); 
        await sequelize.sync({ alter: true }); 
        console.log("Database synced") ; 

    } catch (error) {
        console.log(`Database Connection failed `, error.message);
    }
}

module.exports = connectDatabase ; 