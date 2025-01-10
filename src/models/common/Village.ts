import mongoose from "mongoose";

const VillageSchema = new mongoose.Schema(
  {
    name: {
      eng: {
        type: String,
        required: [true, "English name is required"],
      },
      hin: {
        type: String,
        required: [true, "Hindi name is required"],
      },
      guj: {
        type: String,
        required: [true, "Gujarati name is required"],
      }
    },
    distributionPointId: {
      type: mongoose.Types.ObjectId,
      ref: "DistributionPoint",
      required: [true, "Please provide Distribution Point"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Village", VillageSchema);
