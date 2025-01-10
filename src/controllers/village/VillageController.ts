import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Village from '../../models/common/Village';
import DistributionPoint from '../../models/common/DistributionPoint';
import BadRequestError from '../../errors/bad-request';
import NotFoundError from '../../errors/not-found';

async function checkDistributionPointExists(distributionPointId: string): Promise<void> {
    const distributionPoint = await DistributionPoint.findById(distributionPointId);
    if (!distributionPoint) {
        throw new NotFoundError('Distribution point not found');
    }
}

// Add Village
const addVillage = async (req: Request, res: Response) => {
    const { name, distributionPointId } = req.body;

    await checkDistributionPointExists(distributionPointId);

    if (!name || !name.eng || !name.hin || !name.guj || !distributionPointId) {
        throw new BadRequestError('All language names and distributionPointId are required');
    }

    const village = new Village({ name, distributionPointId });
    await village.save();
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Village added successfully",
        data: village
    });
};

// Update Village
const updateVillage = async (req: Request, res: Response) => {
    const { id, name, distributionPointId } = req.body;

    await checkDistributionPointExists(distributionPointId);

    if (!id) {
        throw new BadRequestError("Please provide the ID of the village.");
    }

    const updatedVillage = await Village.findByIdAndUpdate(
        id,
        { name, distributionPointId },
        { new: true, runValidators: true }
    );

    if (!updatedVillage) {
        throw new NotFoundError('Village not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Village updated successfully",
        data: updatedVillage
    });
};

// Delete Village
const deleteVillage = async (req: Request, res: Response) => {
    const { id } = req.body;

    const deletedVillage = await Village.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    if (!deletedVillage) {
        throw new NotFoundError('Village not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Village deleted successfully'
    });
};

// Get Village by ID
const getVillageById = async (req: Request, res: Response) => {
    const { id } = req.body;

    const village = await Village.findById(id);

    if (!village || village.isDeleted) {
        throw new NotFoundError('Village not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: village
    });
};

// Get Village by Distribution Point ID
const getVillageByDistributionId = async (req: Request, res: Response) => {
    const { distributionPointId } = req.body;

    await checkDistributionPointExists(distributionPointId);

    const villages = await Village.find({ distributionPointId, isDeleted: false });

    if (!villages.length) {
        throw new NotFoundError('No villages found for this distribution point');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: villages
    });
};

// Get All Villages
const getAllVillages = async (req: Request, res: Response) => {
    const villages = await Village.find({ isDeleted: false });

    res.status(StatusCodes.OK).json({
        success: true,
        data: villages
    });
};

export {
    addVillage, updateVillage, deleteVillage, getVillageById, getVillageByDistributionId, getAllVillages
};
