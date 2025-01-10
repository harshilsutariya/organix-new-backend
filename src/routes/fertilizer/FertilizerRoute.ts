import { Router } from "express";
import {
  addFertilizerType,
  updateFertilizerType,
  deleteFertilizerType,
  getFertilizerTypeById,
  getAllFertilizerType,
} from "../../controllers/fertilizer/FertilizerController"; // Adjust path as necessary

const router = Router();

// Define routes for FertilizerType
router.post("/addFertilizerType", addFertilizerType); // Add Fertilizer Type
router.post("/updateFertilizerType", updateFertilizerType); // Update Fertilizer Type
router.post("/deleteFertilizerType", deleteFertilizerType); // Delete Fertilizer Type (Soft Delete)
router.post("/getFertilizerTypeById", getFertilizerTypeById); // Get Fertilizer Type by ID (Using Body)
router.get("/getAllFertilizerType", getAllFertilizerType); // Get All Fertilizer Types

export default router;
