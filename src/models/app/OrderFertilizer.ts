import mongoose from "mongoose";

const OrderFertilizerSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Types.ObjectId,
      ref: "Farmer",
      required: [true, "Please provide Farmer Id"],
    },
    fertilizerId: {
      type: mongoose.Types.ObjectId,
      ref: "Fertilizer",
      required: [true, "Please provide Fertilizer Id"],
    },
    cropId: {
      type: mongoose.Types.ObjectId,
      ref: "CropType",
      required: [true, "Please provide CropId"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    acre: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["ACCEPTED", "PENDING"], // Define the enum options
      default: "PENDING", // Set the default value
    },
    deliveryStatus: {
      type: String,
      enum: ["ACCEPTED", "PENDING"], // Define the enum options
      default: "PENDING", // Set the default value
    },
    talukaId: {
      type: mongoose.Types.ObjectId,
      ref: "Taluka",
      required: [true, "Please provide TalukaId"],
    },
    distributionPointId: {
      type: mongoose.Types.ObjectId,
      ref: "DistributionPoint",
      required: [true, "Please provide Distribution Point"],
    },
    villageId: {
      type: mongoose.Types.ObjectId,
      ref: "Village",
      required: [true, "Please provide Village Id"],
    },
    estimatedDate: {
      type: String || Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderFertilizer", OrderFertilizerSchema);