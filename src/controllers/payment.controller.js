const PaymentService = require("../services/payment.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const paymentValidation = require("../validations/paymentValidation");

module.exports.createPayment = asyncErrorHandler(async (req, res) => {

    const { error } = paymentValidation.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const record = await PaymentService.createPayment(req.body);

    return res.status(200).json({ status: 201, data: record, message: "Payment Done Successfully" });
})


module.exports.getPaymentById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const record = await PaymentService.fetchPaymentById(id);
    return res.status(200).json({ status: 200, data: record, message: "Payment found successfully" });
})

module.exports.listAllPayments = asyncErrorHandler(async (req, res) => {

    const { consultationId, status } = req.query;
    const filters = { consultationId: consultationId, status: status };

    const result = await PaymentService.listPayments(filters, req.pagination);
    return res.status(200).json({ status: 200, data: result, message: "Payment record fetched successfully" });

})

module.exports.getByConsultationId = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const record = await PaymentService.getByConsultationId(id);
    return res.status(200).json({ status: 200, data: record, message: "Payment found successfully" });
})

module.exports.updatePayment = asyncErrorHandler(async (req, res) => {

    const { id, status } = req.body;

    const record = await PaymentService.updatePayment({ id, status });
    return res.status(200).json({ status: 200, data: record, message: "Payment updated successfully" });
})

module.exports.deletePayment = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const isDeleted = await PaymentService.deletePayment(id);

    if (isDeleted) {
        return res.status(200).json({ status: 200, message: "payment deleted successfully" });
    }

    return res.status(200).json({ status: 400, message: "Payment not deleted" });
})
