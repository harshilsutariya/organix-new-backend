import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import DistributionPoint from '../../models/common/DistributionPoint';
import Taluka from '../../models/common/Taluka';
import BadRequestError from '../../errors/bad-request';
import NotFoundError from '../../errors/not-found';

// Helper function to check if the Taluka exists
async function checkTalukaExists(talukaId: string): Promise<void> {
    const taluka = await Taluka.findById(talukaId);
    if (!taluka) {
        throw new NotFoundError('Taluka not found');
    }
}

// Add Distribution Point
const addDistributionPoint = async (req: Request, res: Response) => {
    const { name, talukaId } = req.body;

    await checkTalukaExists(talukaId);

    if (!name || !name.eng || !name.hin || !name.guj || !talukaId) {
        throw new BadRequestError('All language names and TalukaId are required');
    }

    const distributionPoint = new DistributionPoint({ name, talukaId });
    await distributionPoint.save();
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Distribution point added successfully",
        data: distributionPoint
    });
};

// Update Distribution Point
const updateDistributionPoint = async (req: Request, res: Response) => {
    const { id, name, talukaId } = req.body;

    await checkTalukaExists(talukaId);

    if (!id || !name) {
        throw new BadRequestError("Please provide the ID and updated details of the distribution point.");
    }

    const updatedDistributionPoint = await DistributionPoint.findByIdAndUpdate(
        id,
        { name, talukaId },
        { new: true, runValidators: true }
    );

    if (!updatedDistributionPoint) {
        throw new NotFoundError('Distribution point not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Distribution point updated successfully",
        data: updatedDistributionPoint
    });
};

// Delete Distribution Point
const deleteDistributionPoint = async (req: Request, res: Response) => {
    const { id } = req.body;

    const deletedDistributionPoint = await DistributionPoint.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    if (!deletedDistributionPoint) {
        throw new NotFoundError('Distribution point not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Distribution point deleted successfully'
    });
};

// Get Distribution Point by ID
const getDistributionPointById = async (req: Request, res: Response) => {
    const { id } = req.body;

    const distributionPoint = await DistributionPoint.findById(id);

    if (!distributionPoint || distributionPoint.isDeleted) {
        throw new NotFoundError('Distribution point not found');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: distributionPoint
    });
};

// Get All Distribution Points
const getAllDistributionPoint = async (req: Request, res: Response) => {
    const distributionPoints = await DistributionPoint.find({ isDeleted: false });

    res.status(StatusCodes.OK).json({
        success: true,
        data: distributionPoints
    });
};

// Get Distribution Points by TalukaId
const getDistributionPointByTalukaId = async (req: Request, res: Response) => {
    const { talukaId } = req.body;

    await checkTalukaExists(talukaId);

    const distributionPoints = await DistributionPoint.find({ talukaId, isDeleted: false });

    if (!distributionPoints.length) {
        throw new NotFoundError('No distribution points found for this taluka');
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: distributionPoints
    });
};

export { addDistributionPoint, updateDistributionPoint, deleteDistributionPoint, getDistributionPointById, getAllDistributionPoint, getDistributionPointByTalukaId }