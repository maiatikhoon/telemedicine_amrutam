
const Joi = require("joi");
const { _userType } = require("../utils/constants");

const validRoles = Object.values(_userType);

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(...validRoles),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = { registerSchema , loginSchema } ; 