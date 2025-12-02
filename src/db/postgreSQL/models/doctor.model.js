

module.exports = (sequelize, DataTypes) => {

    const Doctor = sequelize.define("Doctor", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "doctors",
        timestamps: true,
        underscored: true
    });

    return Doctor;
}