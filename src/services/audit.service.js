const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");
const { get, set, deleteAllKeys } = require("../utils/cache");


class AuditService {

    static async logAction({ userId, action, metadata = {} }) {
        const db = getDB();

        await deleteAllKeys(`audit:list:user:${userId}:*`);
        await deleteAllKeys(`audit:list:user:action:${action}:*`); 
        
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
        const cachedKey = `audit:list:user:${userId}:action:${action}:page:${page}`;

        const cached = await get(cachedKey);
        if (cached) return cached;

        const { rows, count } = await db.AuditLog.findAndCountAll({
            where,
            offset,
            limit,
            order
        });

        const totalPages = Math.ceil(count / limit);
        const response = {
            logs: rows,
            total: count,
            page: page,
            limit,
            totalPages,
        };

        await set(cachedKey, response);
        return response;
    }
}

module.exports = AuditService; 