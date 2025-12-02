
const express = require("express");
const { createAvailability, listAllSlots, getSlotById, removeSlot, bookSlot } = require("../controllers/availability.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const availabilityRoutes = express.Router();


availabilityRoutes.post("/", verifyToken, permit("admin", "doctor"), createAvailability);
availabilityRoutes.get("/", verifyToken, permit("admin", "doctor"), listAllSlots);
availabilityRoutes.get("/:id", verifyToken, permit("admin", "doctor"), getSlotById);
availabilityRoutes.delete("/:id", verifyToken, permit("admin", "doctor"), removeSlot);
availabilityRoutes.put("/:id", verifyToken, permit("user", "admin"), bookSlot);


module.exports = availabilityRoutes; 