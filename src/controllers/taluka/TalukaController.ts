import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Taluka from "../../models/common/Taluka";
import BadRequestError from "../../errors/bad-request";
import NotFoundError from "../../errors/not-found";

// Add Taluka
const addTaluka = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name || !name.eng || !name.hin || !name.guj) {
        throw new BadRequestError("Please provide the name of the taluka in all required languages.");
    }

    const taluka = await Taluka.create({ name });
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Taluka added successfully.",
        data: taluka,
    });
};

// Update Taluka
const updateTaluka = async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id || !name || !name.eng || !name.hin || !name.guj) {
        throw new BadRequestError("Please provide all required fields along with the ID of the taluka.");
    }

    const taluka = await Taluka.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
    );
    if (!taluka) {
        throw new NotFoundError("Taluka not found.");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Taluka updated successfully.",
        data: taluka,
    });
};

// Delete Taluka
const deleteTaluka = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        throw new BadRequestError("Please provide the ID of the taluka.");
    }

    const taluka = await Taluka.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    if (!taluka) {
        throw new NotFoundError("Taluka not found.");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Taluka deleted successfully.",
    });
};

// Get Taluka by ID
const getTalukaById = async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
        throw new BadRequestError("Please provide the ID of the taluka.");
    }

    const taluka = await Taluka.findById(id);
    if (!taluka || taluka.isDeleted) {
        throw new NotFoundError("Taluka not found.");
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: taluka,
    });
};

// Get All Talukas
const getAllTalukas = async (_req: Request, res: Response) => {
    const talukas = await Taluka.find({ isDeleted: false });
    res.status(StatusCodes.OK).json({
        success: true,
        data: talukas,
    });
};

export { addTaluka, updateTaluka, deleteTaluka, getTalukaById, getAllTalukas };
