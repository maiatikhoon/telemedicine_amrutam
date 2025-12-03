
const Joi = require("joi"); 


const profileSchema = Joi.object({
    
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),

    age: Joi.number()
        .integer()
        .min(0)
        .max(120)
        .optional(),

    gender: Joi.string()
        .valid("male", "female", "other")
        .optional(),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            "string.pattern.base": "Phone must be exactly 10 digits"
        })
});

module.exports = profileSchema ; 