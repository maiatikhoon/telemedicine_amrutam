const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");


class PaymentService {

    static async createPayment({ consultationId, amount, status, txn_id }) {

        const db = getDB();
        const consultation = await db.Consultation.findByPk(consultationId);
        if (!consultation) throw new AppError(400, "Consultation not found");

        const existing = await db.Payment.findOne({ where: { consultation_id: consultationId } });
        if (existing) throw new AppError(400, "Payment already exists for this consultation");

        const record = await db.Payment.create({ consultation_id: consultationId, amount, txn_id, status });
        return record;
    }

    static async fetchPaymentById(id) {
        const db = getDB();
        const payment = await db.Payment.findByPk(id);
        if (!payment) {
            throw new AppError(400, "Payment not found");
        }

        return payment;
    }

    static async listPayments(filters, pagination) {
        const db = getDB();
        const where = {};

        if (filters.consultationId) where.consultation_id = filters.consultationId;
        if (filters.status) where.status = filters.status;

        const { page, offset, limit, order } = pagination;

        const { rows, count } = await db.Payment.findAndCountAll({
            where,
            offset,
            limit,
            order
        });

        const totalPages = Math.ceil(count / limit);
        return {
            payments: rows,
            total: count,
            page: page,
            limit,
            totalPages,
        };
    }

    static async getByConsultationId(id) {
        const db = getDB();

        const record = await db.Payment.findOne({ where: { consultation_id: id } });
        if (!record) throw new AppError(400, "Paymnet not found"); 

        return record ; 
    }

    static async updatePayment({ id, status }) {

        const db = getDB();

        const payment = await db.Payment.findByPk(id);
        if (!payment) {
            throw new AppError(400, "Payment not found");
        }

        await payment.update({ status });
        return payment;
    }

    static async deletePayment(id) {
        const db = getDB();
        const payment = await db.Payment.findByPk(id);
        if (!payment) throw new AppError(400, "Payment not found");

        await payment.destroy();
        return true;
    }
}

module.exports = PaymentService; 