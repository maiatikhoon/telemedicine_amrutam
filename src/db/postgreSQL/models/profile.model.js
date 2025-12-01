

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM("male", "female", "other"),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "profiles",
        timestamps: true,
        underscored: true
    });

    return Profile;
};
