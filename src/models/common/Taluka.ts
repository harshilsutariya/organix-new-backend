import mongoose from "mongoose";

const TalukaSchema = new mongoose.Schema(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Taluka", TalukaSchema);
