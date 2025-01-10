import mongoose from "mongoose";

const CropTypeSchema = new mongoose.Schema(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CropType", CropTypeSchema);
