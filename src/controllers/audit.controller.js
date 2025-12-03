const AuditService = require("../services/audit.service");
const { asyncErrorHandler } = require("../utils/asyncErrorHandler");


module.exports.getLogsById = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const data = await AuditService.getLogById(id);

    return res.status(200).json({ status: 200, data, message: "Logs found successfully" });
})


module.exports.getLogs = asyncErrorHandler(async (req, res) => {

    const { userId, action } = req.query;
    const filters = {
        userId: userId,
        action: action,
    };

    const result = await AuditService.listLogs(filters, req.pagination);
    return res.status(200).json({ status: 200, data: result, message: "Audit Logs found successfully" });
})