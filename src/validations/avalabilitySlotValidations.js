const Joi = require("joi");

const availabilitySlotSchema = Joi.object({
    doctorId: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(),

    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)   
        .required(),

    start_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)  
        .required(),

    end_time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .required()
}).custom((value, helpers) => {
    if (value.start_time >= value.end_time) {
        return helpers.message("end_time must be greater than start_time");
    }
    return value;
});


module.exports = { availabilitySlotSchema }  ; 