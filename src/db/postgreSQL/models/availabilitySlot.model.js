

module.exports = (sequelize, DataTypes) => {
    const AvailabilitySlot = sequelize.define("AvailabilitySlot", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        is_booked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "availability_slots",
        timestamps: true,
        underscored : true , 
    });

    return AvailabilitySlot;
};
