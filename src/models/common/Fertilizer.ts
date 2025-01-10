import mongoose from "mongoose";

const FertilizerSchema = new mongoose.Schema(
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
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["Kg", "lit"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fertilizer", FertilizerSchema);
