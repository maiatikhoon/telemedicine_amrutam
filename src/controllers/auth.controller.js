const AuditService = require("../services/audit.service");
const AuthService = require("../services/auth.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const { registerSchema, loginSchema } = require("../validations/authValidations");

module.exports.registerUser = asyncErrorHandler(async (req, res) => {

    const { email, password, role } = req.body;
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { user, token } = await AuthService.registerUser({ email, password, role });

    await AuditService.logAction({ userId: req.user.id, action: "user_registered", metadata: { userId: user.id, email: user.email } })
    return res.status(200).json({ status: 200, data: { user, token }, message: "User Registered Successfully" });
});

module.exports.loginUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { user, token } = await AuthService.loginUser({ email, password });

    return res.status(200).json({ status: 200, data: { user, token }, message: "User Logged in successfully" });

})