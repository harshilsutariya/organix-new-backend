import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CropType from "../../models/common/CropType";
import BadRequestError from "../../errors/bad-request";
import NotFoundError from "../../errors/not-found";

// Add Crop Type 
const addCropType = async (req: Request, res: Response) => {
  const { name, imageUrl } = req.body;
  if (!name || !name.eng || !name.hin || !name.guj) {
    throw new BadRequestError("Please provide the name of the crop type in all required languages.");
  }
  const cropType = await CropType.create({ name, imageUrl });
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Crop type added successfully.",
    data: cropType,
  });
};

// Update Crop Type
const updateCropType = async (req: Request, res: Response) => {
  const { id, name, imageUrl } = req.body;
  if (!id) {
    throw new BadRequestError("Please provide the ID of the crop type.");
  }
  if (!name || !name.eng || !name.hin || !name.guj) {
    throw new BadRequestError("Please provide the name of the crop type in all required languages.");
  }
  const cropType = await CropType.findByIdAndUpdate(
    id,
    { name, imageUrl },
    { new: true, runValidators: true }
  );
  if (!cropType) {
    throw new NotFoundError("Crop type not found.");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Crop type updated successfully.",
    data: cropType,
  });
};

// Delete Crop Type (Soft Delete)
const deleteCropType = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    throw new BadRequestError("Please provide the ID of the crop type.");
  }
  const cropType = await CropType.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!cropType) {
    throw new NotFoundError("Crop type not found.");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Crop type deleted successfully.",
  });
};

// Get Crop Type by ID
const getCropTypeById = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    throw new BadRequestError("Please provide the ID of the crop type.");
  }
  const cropType = await CropType.findById(id);
  if (!cropType || cropType.isDeleted) {
    throw new NotFoundError("Crop type not found.");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: cropType,
  });
};

// Get All Crop Types
const getAllCropType = async (req: Request, res: Response) => {
  const cropTypes = await CropType.find({ isDeleted: false });
  res.status(StatusCodes.OK).json({
    success: true,
    data: cropTypes,
  });
};

export { addCropType, updateCropType, deleteCropType, getCropTypeById, getAllCropType };
