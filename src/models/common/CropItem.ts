import mongoose from "mongoose";

const CropItemSchema = new mongoose.Schema(
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
    imageUrl: {
      type: String,
      require: false,
    },
    cropId: {
      type: mongoose.Types.ObjectId,
      ref: "CropType",
      required: [true, "Please provide CropId"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CropItem", CropItemSchema);
