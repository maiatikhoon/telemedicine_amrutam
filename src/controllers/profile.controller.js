const AuditService = require("../services/audit.service");
const ProfileService = require("../services/profile.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");
const profileSchema = require("../validations/profileValidation");

module.exports.createProfile = asyncErrorHandler(async (req, res) => {

    const { error } = profileSchema.validate(req.body);
    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { name, age, gender, phone } = req.body;
    const { id: userId } = req.user;
    const profile = await ProfileService.createProfile({ user_id: userId, name, age, gender, phone });

    await AuditService.logAction({ userId: userId, action: "profile_created", metadata: { userId, profileId: profile.id, name, age, phone } })
    return res.status(200).json({ status: 200, data: profile, message: "Profile Created Successfully" });
})

module.exports.getProfileById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const profile = await ProfileService.getMyProfile(id);

    return res.status(200).json({ status: 200, data: profile, message: "Profile found successfully" });
})

module.exports.getProfileByUserId = asyncErrorHandler(async (req, res) => {

    const { id } = req.user;
    const record = await ProfileService.getMyProfileByUserId(id);
    return res.status(200).json({ status: 200, data: record, message: "profile found successfully" });
})

module.exports.listAllProfiles = asyncErrorHandler(async (req, res) => {

    const { name, gender } = req.query;
    const filters = { name: name, gender: gender };

    const records = await ProfileService.listProfiles(filters, req.pagination);
    return res.status(200).json({ status: 200, data: records, message: "Profiles found successfully" });
})

module.exports.updateProfile = asyncErrorHandler(async (req, res) => {

    const { id, name, age, gender, phone } = req.body;

    const record = await ProfileService.updateMyProfile({ id, name, age, gender, phone });
    await AuditService.logAction({ userId: req.user.id, action: "profile_updated", metadata: { userId: req.user.id, name, age, phone } })
    return res.status(200).json({ status: 200, data: record, message: "Profile update successfully" });
})

module.exports.deleteProfile = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const isDeleted = await ProfileService.removeProfile(id);

    if (isDeleted) {
        return res.status(200).json({ status: 200, message: "Profile deleted successfully" });
    }

    return res.status(200).json({ status: 400, message: "Profile not deleted successfully" });
})