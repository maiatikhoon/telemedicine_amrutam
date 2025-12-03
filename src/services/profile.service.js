const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");

class ProfileService {

    static async createProfile({ user_id, name, age, gender, phone }) {
        const db = getDB();
        const user = await db.User.findByPk(user_id);

        if (!user) throw new AppError(400, "User not found");

        const profile = await db.Profile.findOne({ where: { user_id } });

        if (profile) throw new AppError(400, "Profile Already Exist for this user");

        const newProfile = await db.Profile.create({ user_id, name, age, gender, phone });
        return newProfile;
    }

    static async getMyProfile(id) {
        const db = getDB();

        const profile = await db.Profile.findByPk(id);
        if (!profile) throw new AppError(400, "Profile not found");

        return profile;
    }

    static async getMyProfileByUserId(userId) {
        const db = getDB();

        const record = await db.Profile.findOne({ where: { user_id: userId } });
        if (!record) throw new AppError(400, "Profile not found");
        return record;
    }

    static async listProfiles(filters, pagination) {
        const db = getDB();

        const where = {};
        if (filters.name) where.name = filters.name;
        if (filters.gender) where.gender = filters.gender;

        const { page, offset, limit, order } = pagination;

        const { rows, count } = await db.Profile.findAndCountAll({
            where,
            offset,
            limit,
            order,
        })

        const totalPages = Math.ceil(count / limit);
        return {
            profiles: rows,
            total: count,
            page: page,
            limit,
            totalPages,
        }
    }

    static async updateMyProfile({ id, name, age, gender, phone }) {
        const db = getDB();

        const record = await db.Profile.findByPk(id);
        if (!record) throw new AppError(400, "Profile not found");

        const updatedRecord = await db.Profile.update({ name, age, gender, phone });
        return updatedRecord;
    }

    static async removeProfile(id) {
        const db = getDB();

        const profile = await db.Profile.findByPk(id) ; 
        if(!profile) throw new AppError(400 , "Profile not found") ; 

        await profile.destroy() ;  
        return true ; 
    }
}

module.exports = ProfileService; 