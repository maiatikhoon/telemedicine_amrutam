

const Joi = require("joi");
const { _paymentStatus } = require("../utils/constants");

const validPaymentStatus = Object.values(_paymentStatus);

const paymentValidation = Joi.object({
    consultation_id: Joi.string()
        .uuid()
        .required()
        .messages({
            "any.required": "consultation_id is required",
            "string.guid": "consultation_id must be a valid UUID"
        }),

    amount: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
            "number.base": "Amount must be a number",
            "number.positive": "Amount must be greater than 0",
            "any.required": "Amount is required"
        }),

    status: Joi.string()
        .valid(...validPaymentStatus)
        .default(_paymentStatus.pending),

    txn_id: Joi.string()
        .trim()
        .required()
        .messages({
            "any.required": "Transaction ID (txn_id) is required"
        })
});

module.exports = paymentValidation;
