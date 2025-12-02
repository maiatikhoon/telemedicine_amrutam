

const Joi = require("joi");

const prescriptionSchema = Joi.object({
    consultation_id: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(),

    prescription_text: Joi.string()
        .min(1)
        .required(),

    issued_at: Joi.date()
        .optional()
});

const updatePrescriptionSchema = Joi.object({
    id: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(),

    consultation_id: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(),

    prescription_text: Joi.string()
        .min(1)
        .required(),

    issued_at: Joi.date()
        .optional()
})


module.exports = { prescriptionSchema, updatePrescriptionSchema }; 