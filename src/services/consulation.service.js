
const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");
const { _consultationStatus } = require("../utils/constants");

class ConsultationService {

    static async bookConsultation({ userId, doctorId, slotId, notes }) {

        const t = await sequelize.transaction();
        try {
            const db = getDB();
            const slot = await db.AvailabilitySlot.findOne({
                where: { id: slotId },
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!slot) throw new AppError(400, 'Slot not found');
            if (slot.is_booked) throw new AppError(400, 'Slot already booked');


            const doc = await db.Doctor.findByPk(doctorId, { transaction: t });
            if (!doc) throw new AppError(400, 'Doctor not found');

            const user = await db.User.findByPk(userId, { transaction: t });
            if (!user) throw new AppError(400, 'User not found');


            const consultation = await db.Consultation.create({
                user_id: userId,
                doctor_id: doctorId,
                slot_id: slotId,
                status: 'booked',
                notes
            }, { transaction: t });

            await slot.update({ is_booked: true }, { transaction: t });

            await t.commit();
            return consultation;
        } catch (error) {
            await t.rollback();
            throw err;
        }

    }

    static async listConsultations(filters, pagination) {
        const where = {};
        const db = getDB();
        if (filters.userId) where.user_id = filters.userId;
        if (filters.doctorId) where.doctor_id = filters.doctorId;
        if (filters.status) where.status = filters.status;

        const { page, offset, limit, order } = pagination;

        const { rows, count } = await db.Consultation.findAndCountAll({
            where,
            offset,
            limit,
            order
        });
        const totalPages = Math.ceil(count / limit);
        return {
            consultations: rows,
            total: count,
            page: page,
            totalPages,
            limit
        };
    }

    static async fetchConsultationById(id) {
        const db = getDB();

        const record = await db.Consultation.findByPk(id);
        if (!record) throw new AppError(400, "Consultation not found");

        return record;
    }

    static async cancelConsultation({ consultationId  , userId }) {
        const t = await sequelize.transaction();
        const db = getDB();

        try {
            const consultation = await db.Consultation.findByPk(consultationId, { transaction: t, lock: t.LOCK.UPDATE });
            if (!consultation) throw new AppError(400, 'Consultation not found');

            if (consultation.status === _consultationStatus.cancelled) {
                await t.commit();
                return consultation;
            }

            const slot = await db.AvailabilitySlot.findByPk(consultation.slot_id, { transaction: t, lock: t.LOCK.UPDATE });
            if (slot) await slot.update({ is_booked: false }, { transaction: t });

            await consultation.update({ status: _consultationStatus.cancelled }, { transaction: t });

            await t.commit();
            return consultation;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    static async startConsultation(consultationId) {
        const db = getDB();
        const c = await db.Consultation.findByPk(consultationId);
        if (!c) throw new AppError(400, 'Consultation not found');
        await c.update({ status: _consultationStatus.ongoing });
        return c;
    }

    static async completeConsultation(consultationId) {
        const db = getDB();
        const c = await db.Consultation.findByPk(consultationId);
        if (!c) throw new AppError(400, 'Consultation not found');
        await c.update({ status: _consultationStatus.completed });
        return c;
    }
}

module.exports = ConsultationService; 