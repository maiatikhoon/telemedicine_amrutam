const ConsultationService = require("../services/consulation.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const consultationSchema = require("../validations/consultationValidation");


module.exports.bookConsultation = asyncErrorHandler(async (req, res) => {

    const { doctorId, slotId, notes } = req.body;  
    
    const { error } = consultationSchema.validate(req.body) ; 
    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const consultation = await ConsultationService.bookConsultation({ userId, doctorId, slotId, notes });

    return res.status(200).json({ status: 201, data: consultation, message: "consultation created successfully" });
})

module.exports.listAllConsultation = asyncErrorHandler(async (req, res) => {

    const filters = {
        userId: req.query.userId,
        doctorId: req.query.doctorId,
        status: req.query.status
    };

    const result = await ConsultationService.listConsultations(filters, req.pagination);

    return res.status(200).json({ status: 200, data: result, message: "consultations fetched successfully" });
})

module.exports.getConsultationById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const records = await ConsultationService.fetchConsultationById(id);
    return res.status(200).json({ status: 200, data: records, message: "consultation found successfully" });
})

module.exports.cancelConsultation = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const { id: userId } = req.user;
    const record = await ConsultationService.cancelConsultation({id, userId});

    return res.status(200).json({ status: 200, data: record, message: "consultation cancelled successfully" });
})


module.exports.startConsultation = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const record = await ConsultationService.startConsultation(id);

    return res.status(200).json({ status: 200, data: record, message: "consultation started successfully" });
})


module.exports.completeConsultation = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const record = await ConsultationService.completeConsultation(id);

    return res.status(200).json({ status: 200, data: record, message: "consultation completed successfully" });
})


