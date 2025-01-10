"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FertilizerController_1 = require("../../controllers/fertilizer/FertilizerController"); // Adjust path as necessary
var router = (0, express_1.Router)();
// Define routes for FertilizerType
router.post("/addFertilizerType", FertilizerController_1.addFertilizerType); // Add Fertilizer Type
router.post("/updateFertilizerType", FertilizerController_1.updateFertilizerType); // Update Fertilizer Type
router.post("/deleteFertilizerType", FertilizerController_1.deleteFertilizerType); // Delete Fertilizer Type (Soft Delete)
router.post("/getFertilizerTypeById", FertilizerController_1.getFertilizerTypeById); // Get Fertilizer Type by ID (Using Body)
router.get("/getAllFertilizerType", FertilizerController_1.getAllFertilizerType); // Get All Fertilizer Types
exports.default = router;
