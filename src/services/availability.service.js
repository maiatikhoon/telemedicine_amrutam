
const { Op } = require('sequelize');
const { getDB } = require('../db/postgreSQL');
const AppError = require('../utils/appError');
const { get, set, deleteAllKeys, del } = require('../utils/cache');

class AvailabilityService {

    static async createSlot({ doctorId, date, start_time, end_time }) {

        const db = getDB();
        const doctor = await db.Doctor.findByPk(doctorId);
        if (!doctor) throw new AppError(400, 'Doctor not found');

        const overlapping = await db.AvailabilitySlot.findOne({
            where: {
                doctor_id: doctorId,
                date,
                [Op.or]: [
                    {
                        start_time: { [Op.between]: [start_time, end_time] }
                    },
                    {
                        end_time: { [Op.between]: [start_time, end_time] }
                    },
                    {
                        start_time: { [Op.lte]: start_time },
                        end_time: { [Op.gte]: end_time }
                    }
                ]
            }
        });

        if (overlapping) {
            throw new AppError(400, 'Slot overlaps an existing slot');
        }

        const slot = await db.AvailabilitySlot.create({
            doctor_id: doctorId,
            date,
            start_time,
            end_time
        });

        await deleteAllKeys(`slots:doctor:${doctorId}:*`);
        return slot;
    }

    static async listSlots({ doctorId, date, availableOnly = true }, pagination) {

        const db = getDB();
        const where = {};
        if (doctorId) where.doctor_id = doctorId;
        if (date) where.date = date;
        if (availableOnly) where.is_booked = false;

        const { page, offset, limit, order } = pagination;

        const cacheKey = `slots:doctor:${doctorId}:date:${date}:available:${availableOnly}:page:${page}`;

        const cached = await get(cacheKey);
        if (cached) return cached;

        const slots = await db.AvailabilitySlot.findAndCountAll({
            where,
            offset,
            limit,
            order,
        });

        const count = slots.count;
        const totalPages = Math.ceil(count / limit);
        const records = { ...slots, page, totalPages, limit };

        await set(cacheKey, records);
        return records;
    }

    static async getSlotById(id) {
        const db = getDB();
        const cachedKey = `slot:${id}`;
        const cached = await get(cachedKey);
        if (cached) return cached;
        const slot = await db.AvailabilitySlot.findByPk(id);

        await set(cachedKey, slot);
        return slot;
    }

    static async markBooked(slotId, t = null) {
        const db = getDB();
        const slot = await db.AvailabilitySlot.findByPk(slotId, { transaction: t, lock: t ? t.LOCK.UPDATE : undefined });
        if (!slot) throw new AppError(400, 'Slot not found');
        if (slot.is_booked) throw new AppError('Slot already booked');

        await slot.update({ is_booked: true }, { transaction: t });
        await del(`slot:${slot.id}`);
        await deleteAllKeys(`slots:doctor:${slot.doctor_id}`);
        return slot;
    }

    static async deleteSlot(slotId) {

        const db = getDB();
        const slot = await db.AvailabilitySlot.findByPk(slotId);
        if (!slot) {
            throw new AppError(400, "Slot not found");
        }

        await del(`slot:${slotId}`);
        await deleteAllKeys(`slot:doctor:${slot.doctor_id}`);
        return true;
    }
}

module.exports = AvailabilityService;
