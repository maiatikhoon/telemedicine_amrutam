
const { Sequelize } = require("sequelize")
const { associationModels } = require("./associations");
const loadModels = require("./loadModels");

let db = null;

async function initPostgres() {

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


    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully");
    } catch (err) {
        console.error("PostgreSQL connection error:", err.message);
        throw err;
    }

    if (db) return db;
    db = {};

    loadModels(sequelize, db);
    associationModels(db);

    db.sequelize = sequelize;
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    return db;
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized.");
    } 

    return db ; 
}

module.exports = { initPostgres , getDB }; 