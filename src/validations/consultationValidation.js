const Joi = require("joi");

const consultationSchema = Joi.object({ 
    
    doctor_id: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(),

    slot_id: Joi.string()
        .uuid({ version: "uuidv4" })
        .required(), 

    notes: Joi.string()
        .allow(null, "")
        .optional(),
});

module.exports = consultationSchema ; 