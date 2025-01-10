import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CropItem from '../../models/common/CropItem';
import CropType from '../../models/common/CropType';
import BadRequestError from '../../errors/bad-request';
import NotFoundError from '../../errors/not-found';


async function checkCropTypeExists(cropId: string): Promise<void> {
  const cropType = await CropType.findById(cropId);
  if (!cropType) {
    throw new NotFoundError('CropType not found');
  }
}

// Add Crop Item
const addCropItem = async (req: Request, res: Response) => {
  const { name, imageUrl, cropId } = req.body;

  await checkCropTypeExists(cropId);

  // Ensure all parts of the name are provided
  if (!name || !name.eng || !name.hin || !name.guj || !cropId) {
    throw new BadRequestError('All language names and CropId are required');
  }

  const cropItem = new CropItem({ name, imageUrl, cropId });
  await cropItem.save();
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Crop item added successfully",
    data: cropItem
  });
};

// Update Crop Item
const updateCropItem = async (req: Request, res: Response) => {
  const { id, name, imageUrl, cropId } = req.body;

  await checkCropTypeExists(cropId);

  if (!id) {
    throw new BadRequestError("Please provide the ID of the crop item.");
  }

  const updatedCropItem = await CropItem.findByIdAndUpdate(
    id,
    { name, imageUrl, cropId },
    { new: true, runValidators: true }
  );

  if (!updatedCropItem) {
    throw new NotFoundError('Crop item not found');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Crop item updated successfully",
    data: updatedCropItem
  });
};

// Delete Crop Item
const deleteCropItem = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deletedCropItem = await CropItem.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedCropItem) {
    throw new NotFoundError('Crop item not found');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Crop item deleted successfully'
  });
};

// Get Crop Item by ID
const getCropItemById = async (req: Request, res: Response) => {
  const { id } = req.body;

  const cropItem = await CropItem.findById(id);

  if (!cropItem || cropItem.isDeleted) {
    throw new NotFoundError('Crop item not found');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: cropItem
  });
};

// Get All Crop Items
const getAllCropItems = async (req: Request, res: Response) => {

  const cropItems = await CropItem.find({ isDeleted: false });

  res.status(StatusCodes.OK).json({
    success: true,
    data: cropItems
  });
};

// Get Crop Item by CropId
const getCropItemByCropTypeId = async (req: Request, res: Response) => {
  const { cropId } = req.body;

  await checkCropTypeExists(cropId);

  const cropItems = await CropItem.find({ cropId, isDeleted: false });

  if (!cropItems.length) {
    throw new NotFoundError('No crop items found for this cropId');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: cropItems
  });
};

export { addCropItem, updateCropItem, deleteCropItem, getCropItemById, getAllCropItems, getCropItemByCropTypeId };
