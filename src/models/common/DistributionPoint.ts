import mongoose from "mongoose";

const DistributionPointSchema = new mongoose.Schema(
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
    talukaId: {
      type: mongoose.Types.ObjectId,
      ref: "Taluka",
      required: [true, "Please provide TalukaId"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DistributionPoint", DistributionPointSchema);
