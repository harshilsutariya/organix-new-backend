import { Router } from 'express';
import {
  addCropItem,
  updateCropItem,
  deleteCropItem,
  getCropItemById,
  getAllCropItems,
  getCropItemByCropTypeId,
} from '../../controllers/CropItem/CropItemController'; // Adjust the import path as necessary

const router = Router();

// Define routes for CropItem
router.post('/addCropItem', addCropItem);
router.post('/updateCropItem', updateCropItem);
router.post('/deleteCropItem', deleteCropItem);
router.post('/getCropItemById', getCropItemById);
router.get('/getAllCropItems', getAllCropItems);
router.post('/getCropItemByCropTypeId', getCropItemByCropTypeId);

export default router;
