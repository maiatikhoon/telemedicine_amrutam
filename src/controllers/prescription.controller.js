const PrescriptionService = require("../services/prescription.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const { prescriptionSchema, updatePrescriptionSchema } = require("../validations/prescriptionValidation");


module.exports.createPrescription = asyncErrorHandler(async (req, res) => {

    const { consultationId, prescription_text } = req.body;

    const { error } = prescriptionSchema.validate(req.body);
    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const data = await PrescriptionService.createPrescription({ consultationId, prescription_text });
    return res.status(200).json({ status: 201, data, message: "Prescription created successfully" });
})


module.exports.getPrescriptionById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const record = await PrescriptionService.fetchPrescriptionById(id);
    return res.status(200).json({ status: 200, data: record, message: "Prescription fetched sucessfully" });

})

module.exports.listAllPrescriptions = asyncErrorHandler(async (req, res) => {

    const { consultationId } = req.query;
    const filters = { consultationId: consultationId };

    const records = await PrescriptionService.listPrescriptions(filters, req.pagination);

    return res.status(200).json({ status: 200, data: records, message: "prescriptions found successfully" });
})

module.exports.updatePrescription = asyncErrorHandler(async (req, res) => {
    const { id, consultationId, prescription_text, issued_at } = req.body;

    const { error } = updatePrescriptionSchema.validate(req.body);
    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const record = await PrescriptionService.updatePrescription({ id, consultationId, prescription_text, issued_at });
    return res.status(200).json({ status: 200, data: record, message: "Prescription updated successfully" });
})

module.exports.removePrescription = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const isDeleted = await PrescriptionService.deletePrescription(id);

    if (isDeleted) {
        return res.status(200).json({ status: 200, message: "Prescription deleted successfully" });
    }

    return res.status(200).json({ status: 400, message: "Prescription not deleted successfully" });
})