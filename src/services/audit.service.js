const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");


class AuditService {

    static async logAction({ userId, action, metadata = {} }) { 
        const db = getDB() ; 
        return db.AuditLog.create({
            user_id: userId,
            action,
            metadata
        });
    }

    static async getLogById(id) {
        const db = getDB();
        const record = await db.AuditLog.findByPk(id);

        if (!record) throw new AppError(400, "Logs not found");
        return record;
    }

    static async listLogs(filters, pagination) {
        const db = getDB();
        const where = {};

        if (filters.userId) where.user_id = filters.userId;
        if (filters.action) where.action = filters.action;

        const { page, offset, limit, order } = pagination;

        const { rows, count } = await db.AuditLog.findAndCountAll({
            where,
            offset,
            limit,
            order
        });

        const totalPages = Math.ceil(count / limit);
        return {
            logs: rows,
            total: count,
            page: page,
            limit,
            totalPages,
        };
    }
}

module.exports = AuditService; 