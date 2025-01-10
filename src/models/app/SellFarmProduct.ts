import mongoose from "mongoose";

const SellFarmProductSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Types.ObjectId,
      ref: "Farmer",
      required: [true, "Please provide Farmer Id"],
    },
    cropId: {
      type: mongoose.Types.ObjectId,
      ref: "CropType",
      required: [true, "Please provide CropId"],
    },
    cropItemId: {
      type: mongoose.Types.ObjectId,
      ref: "CropItem",
      required: [true, "Please provide CropItem Id"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["Kg", "lit"],
    },
    price: {
      type: Number,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SellFarmProduct", SellFarmProductSchema);
