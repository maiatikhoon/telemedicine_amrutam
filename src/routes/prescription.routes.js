

const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { createPrescription, getPrescriptionById, listAllPrescriptions, updatePrescription, removePrescription } = require("../controllers/prescription.controller");

const prescriptionRoutes = express.Router();

prescriptionRoutes.post("/", verifyToken, permit("doctor"), createPrescription);
prescriptionRoutes.get("/:id", verifyToken, permit("doctor", "admin", "user"), getPrescriptionById);
prescriptionRoutes.get("/", verifyToken, permit("doctor", "admin"), listAllPrescriptions);
prescriptionRoutes.put("/:id", verifyToken, permit("doctor"), updatePrescription);
prescriptionRoutes.delete("/:id", verifyToken, permit("admin"), removePrescription);



module.exports = prescriptionRoutes; 