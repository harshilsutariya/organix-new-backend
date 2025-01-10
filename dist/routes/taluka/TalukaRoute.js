"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TalukaController_1 = require("../../controllers/taluka/TalukaController");
var router = (0, express_1.Router)();
// Define routes for Taluka
router.post("/addTaluka", TalukaController_1.addTaluka); // Add Taluka
router.post("/updateTaluka", TalukaController_1.updateTaluka); // Update Taluka
router.post("/deleteTaluka", TalukaController_1.deleteTaluka); // Delete Taluka (Soft Delete)
router.post("/getTalukaById", TalukaController_1.getTalukaById); // Get Taluka by ID (Using Body)
router.get("/getAllTaluka", TalukaController_1.getAllTalukas); // Get All Talukas
exports.default = router;
