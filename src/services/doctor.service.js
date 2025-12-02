const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");
const { Op } = require("sequelize");

class DoctorService {

    static async createDoctor({ userId, specialization, experience }) {
        const db = getDB();

        const user = await db.User.findByPk(userId);
        if (!user) throw new Error(400, 'User not found');

        const newDoctor = await db.Doctor.create({ user_id: userId, specialization, experience });
        return newDoctor;
    }

    static async getDoctorById(id) {

        const db = getDB();

        const doctor = await db.Doctor.findByPk(id);
        if (!doctor) {
            throw new AppError(400, "Doctor not found");
        }

        return doctor;
    }

    static async listAllDoctors({ q, specialization, page, limit, offset, order }) {

        const db = getDB();
        const where = {};
        const profileWhere = {};

        if (q) {
            profileWhere.name = { [Op.iLike]: `%${q}%` };
        }

        if (specialization) {
            where.specialization = specialization;
        }

        const doctors = await db.Doctor.findAndCountAll({
            where,
            include: [
                {
                    model: db.User,
                    include: [
                        {
                            model: db.Profile,
                            where: profileWhere,
                            required: true
                        }
                    ]
                }
            ],
            offset,
            limit,
            order
        });

        const count = doctors.count;
        const totalPages = Math.ceil(count / limit);
        const records = { ...doctors, page, totalPages }
        return records;
    }

    static async updateDoctor({ id, specialization, experience }) {
        const db = getDB();

        const doc = await Doctor.findByPk(id);
        if (!doc) {
            throw new AppError(400, "Doctor not found");
        }

        await doc.update({ specialization, experience });
        return doc;
    }

    static async deleteDoctor(id) { 
        
        const db = getDB() ; 
        const doctor = await db.Doctor.findByPk(id) ; 
        if(!doctor) { 
            throw new AppError(400 , "Doctor not found") ; 
        }

        await doctor.destroy() ;  
        return true ; 
    }
}


module.exports = DoctorService;