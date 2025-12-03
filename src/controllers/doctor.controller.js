const { expression } = require("joi");
const AuditService = require("../services/audit.service");
const DoctorService = require("../services/doctor.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const { registerDoctorSchema } = require("../validations/doctorValidations");


module.exports.createDoctor = asyncErrorHandler(async (req, res) => {

    const { id: userId } = req.user;
    const { specialization, experience } = req.body;

    const { error } = registerDoctorSchema.validate(req.body);
    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }
    const doctor = await DoctorService.createDoctor({ userId, specialization, experience });

    await AuditService.logAction({ userId: req.user.id, action: "doctor_created", metadata: { doctorId: record.id, specialization: record.specialization, experience: record.experience } })
    return res.status(200).json({ status: 201, data: doctor, message: "doctor created successfully" });
})


module.exports.getDoctorById = asyncErrorHandler(async (req, res) => {


    const { id } = req.params;

    const doctor = await DoctorService.getDoctorById(id);
    return res.status(200).json({ status: 200, data: doctor, message: "Doctor found successfully" });
})

module.exports.listAllDoctos = asyncErrorHandler(async (req, res) => {

    const { page, offset, limit, order } = req.pagination;
    const { q, specialization } = req.query;

    const doctors = await DoctorService.listAllDoctors({ q, specialization, page, offset, limit, order });
    return res.status(200).json({ status: 200, data: doctors, message: "All Doctors found successfully" });
})

module.exports.updateDoctor = asyncErrorHandler(async (req, res) => {

    const { id, specialization, experience } = req.body;

    const doctor = await DoctorService.updateDoctor({ id, specialization, experience });

    await AuditService.logAction({ userId: req.user.id, action: "doctor_updated", metadata: { doctorId: doctor.id, specialization: doctor.specialization, expression: record.experience } })
    return res.status(200).json({ status: 200, data: doctor, message: "Doctor updated successfully" });
})

module.exports.removeDoctor = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    await DoctorService.deleteDoctor(id);
    return res.status(200).json({ status: 200, message: "doctor deleted successfully" });
})