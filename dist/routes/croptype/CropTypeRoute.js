"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CropTypeController_1 = require("../../controllers/CropType/CropTypeController");
var router = (0, express_1.Router)();
// Define routes
router.post("/addCropType", CropTypeController_1.addCropType); // Add Crop Type
router.post("/updateCropType", CropTypeController_1.updateCropType); // Update Crop Type
router.post("/deleteCropType", CropTypeController_1.deleteCropType); // Delete Crop Type (Soft Delete)
router.post("/getCropTypeById", CropTypeController_1.getCropTypeById); // Get Crop Type by ID (Using Body)
router.get("/getAllCropType", CropTypeController_1.getAllCropType); // Get All Crop Types
exports.default = router;
