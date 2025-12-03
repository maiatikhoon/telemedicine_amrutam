
const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { getLogsById, getLogs } = require("../controllers/audit.controller");

const auditRoutes = express.Router();


auditRoutes.get("/:id", verifyToken, permit("admin"), getLogsById);
auditRoutes.get("/", verifyToken, permit("admin"), getLogs);

module.exports = auditRoutes;