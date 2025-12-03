
const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { permit } = require("../middlewares/permit");
const { createProfile, getProfileById, listAllProfiles, getProfileByUserId, updateProfile, deleteProfile } = require("../controllers/profile.controller");
const profileRoutes = express.Router();

profileRoutes.post("/", verifyToken, permit("user", "doctor"), createProfile);
profileRoutes.get("/:id", verifyToken, getProfileById);
profileRoutes.get("/", verifyToken, permit("admin"), listAllProfiles);
profileRoutes.get("/me", verifyToken, getProfileByUserId);
profileRoutes.put("/", verifyToken, updateProfile);
profileRoutes.delete("/:id", verifyToken, permit("admin"), deleteProfile);

module.exports = profileRoutes; 