import { Router } from "express";
import {
  addCropType,
  updateCropType,
  deleteCropType,
  getCropTypeById,
  getAllCropType,
} from "../../controllers/CropType/CropTypeController";

const router = Router();

// Define routes
router.post("/addCropType", addCropType); // Add Crop Type
router.post("/updateCropType", updateCropType); // Update Crop Type
router.post("/deleteCropType", deleteCropType); // Delete Crop Type (Soft Delete)
router.post("/getCropTypeById", getCropTypeById); // Get Crop Type by ID (Using Body)
router.get("/getAllCropType", getAllCropType); // Get All Crop Types

export default router;
