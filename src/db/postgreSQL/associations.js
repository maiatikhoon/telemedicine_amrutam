
module.exports.associationModels = (db) => { 
    const { User , Profile , Doctor } = db;

    User.hasOne(Profile, { foreignKey: "user_id", onDelete: "CASCADE" });
    Profile.belongsTo(User, { foreignKey: "user_id" }); 

    User.hasOne(Doctor, { foreignKey: "user_id", onDelete: "CASCADE" });
    Doctor.belongsTo(User, { foreignKey: "user_id" });

}