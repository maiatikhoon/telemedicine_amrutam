
module.exports = (sequelize, DataTypes) => { 
    
    const Prescription = sequelize.define("Prescription", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        consultation_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        prescription_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        issued_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "prescriptions",
        timestamps: false
    });

    return Prescription;
};
