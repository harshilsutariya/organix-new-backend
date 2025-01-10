import { Router } from "express";
import {
    addTaluka,
    updateTaluka,
    deleteTaluka,
    getTalukaById,
    getAllTalukas
} from "../../controllers/taluka/TalukaController";

const router = Router();

// Define routes for Taluka
router.post("/addTaluka", addTaluka); // Add Taluka
router.post("/updateTaluka", updateTaluka); // Update Taluka
router.post("/deleteTaluka", deleteTaluka); // Delete Taluka (Soft Delete)
router.post("/getTalukaById", getTalukaById); // Get Taluka by ID (Using Body)
router.get("/getAllTaluka", getAllTalukas); // Get All Talukas

export default router;
