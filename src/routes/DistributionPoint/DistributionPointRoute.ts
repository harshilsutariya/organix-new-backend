import { Router } from 'express';
import {
    addDistributionPoint,
    updateDistributionPoint,
    deleteDistributionPoint,
    getDistributionPointById,
    getAllDistributionPoint,
    getDistributionPointByTalukaId
} from '../../controllers/DistributionPoint/DistributionPointController'; // Ensure the path is correct

const router = Router();

router.post("/addDistributionPoint", addDistributionPoint); // Add Taluka
router.post("/updateDistributionPoint", updateDistributionPoint); // Update Taluka
router.post("/deleteDistributionPoint", deleteDistributionPoint); // Delete Taluka
router.post("/getDistributionPointById", getDistributionPointById); // Get Taluka by ID using POST
router.get("/getAllDistributionPoint", getAllDistributionPoint); // Get All Talukas
router.post("/getDistributionPointByTalukaId", getDistributionPointByTalukaId); // Get All Talukas

export default router;
