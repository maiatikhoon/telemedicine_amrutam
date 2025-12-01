const { getDB } = require("../db/postgreSQL");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { _userType } = require("../utils/constants");

class AuthService {

    static async registerUser({ email, password, role }) {

        const db = getDB();

        if (role && role === _userType.admin) {
            throw new AppError(400, "Cannot self-assign Admin role during registration.");
        }

        const existingUser = await db.User.findOne({ where: { email } });

        if (existingUser) {
            throw new AppError(400, "User already Exist");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.User.create({ email, password: hashedPassword, role });

        const payload = { id: newUser.id, role: newUser.role, email: newUser.email };

        const token = generateToken(payload);

        return { user: payload, token };
    }

    static async loginUser({ email, password }) {

        const db = getDB() ; 
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            throw new AppError(400, "User doesn't exist, Register first");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new AppError(401, "Invalid Credentials.");
        }

        const payload = { id: user.id, role: user.role, username: user.username, email: user.email };

        const token = generateToken(payload);
        return { user: payload, token };
    }
}


module.exports = AuthService; 