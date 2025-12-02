const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");

class PrescriptionService {

    static async createPrescription({ consultationId, prescription_text }) {

        const db = getDB();
        const consultation = await db.Consultation.findByPk(consultationId);
        if (!consultation) throw new AppError(400, "Consultation not found");

        const existing = await db.Prescription.findOne({ where: { consultation_id: consultationId } });
        if (existing) throw new AppError(400, "Prescription already exists for this consultation");

        const prescription = await db.Prescription.create({ consultation_id: consultationId, prescription_text });

        return prescription;
    }

    static async fetchPrescriptionById(id) {
        const db = getDB();
        const record = await db.Prescription.findByPk(id);
        if (!record) throw new AppError(400, "Prescription not found");

        return record;
    }

    static async listPrescriptions(filters, pagination) {
        const where = {};

        if (filters.consultationId) where.consultation_id = filters.consultationId;

        const { page, offset, limit, order } = pagination;

        const { rows, count } = await Prescription.findAndCountAll({
            where,
            offset,
            limit,
            order
        });

        const totalPages = Math.ceil(count / limit);
        return {
            prescriptions: rows,
            total: count,
            page: page,
            limit,
            totalPages,
        };

    }

    static async updatePrescription({ id, consultationId, prescription_text, issued_at }) {
        const db = getDB();
        const prescription = await db.Prescription.findByPk(id);
        if (!prescription) throw new AppError(400, "Prescription not found");
        return prescription.update({ consultationId, prescription_text, issued_at });
    }

    static async deletePrescription(id) {
        const db = getDB();
        const prescription = await db.Prescription.findByPk(id);
        if (!prescription) throw new AppError(400, "Prescription not found");

        await prescription.destroy();
        return true;
    }
}

module.exports = PrescriptionService; 