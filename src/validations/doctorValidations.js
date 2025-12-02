
const Joi = require("joi");

const registerDoctorSchema = Joi.object({

    specialization: Joi.string().min(2).required(),
    experience: Joi.number().min(1).max(2).required(),
})

module.exports = { registerDoctorSchema } ; 