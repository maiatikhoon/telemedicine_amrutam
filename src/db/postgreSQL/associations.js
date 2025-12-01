
module.exports.associationModels = (db) => { 
    const { User , Profile } = db;

    User.hasOne(Profile, { foreignKey: "user_id", onDelete: "CASCADE" });
    Profile.belongsTo(User, { foreignKey: "user_id" });
}