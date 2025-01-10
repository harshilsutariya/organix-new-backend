"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CropItemController_1 = require("../../controllers/CropItem/CropItemController"); // Adjust the import path as necessary
var router = (0, express_1.Router)();
// Define routes for CropItem
router.post('/addCropItem', CropItemController_1.addCropItem);
router.post('/updateCropItem', CropItemController_1.updateCropItem);
router.post('/deleteCropItem', CropItemController_1.deleteCropItem);
router.post('/getCropItemById', CropItemController_1.getCropItemById);
router.get('/getAllCropItems', CropItemController_1.getAllCropItems);
router.post('/getCropItemByCropTypeId', CropItemController_1.getCropItemByCropTypeId);
exports.default = router;
