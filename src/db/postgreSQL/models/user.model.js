
const { _userType } = require("../../../utils/constants");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(_userType.user, _userType.admin, _userType.doctor),
            defaultValue: _userType.user,
        }
    }, {
        tableName: "users",
        timestamps: true,
        underscored: true
    });

    return User;
};
