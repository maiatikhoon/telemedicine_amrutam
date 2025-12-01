const AuthService = require("../services/auth.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");

module.exports.registerUser = asyncErrorHandler(async (req, res) => {

    const { email, password, role } = req.body;
    const { user, token } = await AuthService.registerUser({ email, password, role });

    return res.status(200).json({ status: 200, data: { user, token }, message: "User Registered Successfully" });
});

module.exports.loginUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const { user, token } = await AuthService.loginUser({ email, password });

    return res.status(200).json({ status: 200, data: { user, token }, message: "User Logged in successfully" });

})