
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

function loadModels(sequelize, db) {

    const modelsPath = path.join(__dirname, "models");

    fs.readdirSync(modelsPath)
        .filter((file) => file.endsWith(".model.js"))
        .forEach((file) => {
            const modelDefiner = require(path.join(modelsPath, file));
            const model = modelDefiner(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    return db;
}

module.exports = loadModels;
