
module.exports.associationModels = (db) => {
    const { User, Profile, Doctor, Consultation , AvailabilitySlot , Prescription } = db;

    User.hasOne(Profile, { foreignKey: "user_id", onDelete: "CASCADE" });
    Profile.belongsTo(User, { foreignKey: "user_id" });

    User.hasOne(Doctor, { foreignKey: "user_id", onDelete: "CASCADE" });
    Doctor.belongsTo(User, { foreignKey: "user_id" });

    Doctor.hasMany(Consultation, { foreignKey: "doctor_id" });
    Consultation.belongsTo(Doctor, { foreignKey: "doctor_id" });

    AvailabilitySlot.hasOne(Consultation, { foreignKey: "slot_id" });
    Consultation.belongsTo(AvailabilitySlot, { foreignKey: "slot_id" });

    Consultation.hasOne(Prescription, { foreignKey: "consultation_id" });
    Prescription.belongsTo(Consultation, { foreignKey: "consultation_id" });

}