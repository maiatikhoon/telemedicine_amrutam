const { _consultationStatus } = require("../../../utils/constants");

module.exports = (sequelize, DataTypes) => {
    const Consultation = sequelize.define("Consultation", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        doctor_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        slot_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(_consultationStatus.booked, _consultationStatus.ongoing, _consultationStatus.completed, _consultationStatus.cancelled),
            defaultValue: _consultationStatus.booked
        },
        notes: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: "consultations",
        timestamps: true,
        underscored: true,
    });

    return Consultation;
};
