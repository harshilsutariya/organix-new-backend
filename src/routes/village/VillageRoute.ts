import { Router } from 'express';
import {
    addVillage,
    updateVillage,
    deleteVillage,
    getVillageById,
    getVillageByDistributionId,
    getAllVillages
} from '../../controllers/village/VillageController'; // Adjust the path according to your project structure

const router = Router();

router.post("/addVillage", addVillage);
router.post("/updateVillage", updateVillage);
router.post("/deleteVillage", deleteVillage);
router.post("/getVillageById", getVillageById);
router.post("/getVillageByDistributionId", getVillageByDistributionId);
router.get("/getAllVillage", getAllVillages);

export default router;
