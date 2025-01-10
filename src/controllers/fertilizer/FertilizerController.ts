import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Fertilizer from "../../models/common/Fertilizer";
import BadRequestError from "../../errors/bad-request";
import NotFoundError from "../../errors/not-found";

// Add Fertilizer Type
const addFertilizerType = async (req: Request, res: Response) => {
  const { name, imageUrl, price, unit } = req.body;

  // Validate multilingual names and other required fields
  if (!name || !name.eng || !name.hin || !name.guj || !imageUrl || price == null || !unit) {
    throw new BadRequestError("Please provide all required fields.");
  }

  const fertilizer = await Fertilizer.create({ name, imageUrl, price, unit });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Fertilizer type added successfully.",
    data: fertilizer,
  });
};

// Update Fertilizer Type
const updateFertilizerType = async (req: Request, res: Response) => {
  const { id, name, imageUrl, price, unit } = req.body;

  if (!id || !name || !name.eng || !name.hin || !name.guj || !imageUrl || price == null || !unit) {
    throw new BadRequestError("Please provide all required fields along with the ID of the fertilizer type.");
  }

  const fertilizer = await Fertilizer.findByIdAndUpdate(
    id,
    { name, imageUrl, price, unit },
    { new: true, runValidators: true }
  );

  if (!fertilizer) {
    throw new NotFoundError("Fertilizer type not found.");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Fertilizer type updated successfully.",
    data: fertilizer,
  });
};

// Delete Fertilizer Type (Soft Delete)
const deleteFertilizerType = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    throw new BadRequestError("Please provide the ID of the fertilizer type.");
  }

  const fertilizer = await Fertilizer.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!fertilizer) {
    throw new NotFoundError("Fertilizer type not found.");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Fertilizer type deleted successfully.",
  });
};

// Get Fertilizer Type by ID
const getFertilizerTypeById = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    throw new BadRequestError("Please provide the ID of the fertilizer type.");
  }

  const fertilizer = await Fertilizer.findById(id);

  if (!fertilizer || fertilizer.isDeleted) {
    throw new NotFoundError("Fertilizer type not found.");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: fertilizer,
  });
};

// Get All Fertilizer Types
const getAllFertilizerType = async (_req: Request, res: Response) => {
  const fertilizers = await Fertilizer.find({ isDeleted: false });

  res.status(StatusCodes.OK).json({
    success: true,
    data: fertilizers,
  });
};

export { addFertilizerType, updateFertilizerType, deleteFertilizerType, getFertilizerTypeById, getAllFertilizerType }