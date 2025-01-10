import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const FarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      minlength: [10, "Mobile number must be at least 10 characters long"],
      require: true,
    },
    distributionPointId: {
      type: mongoose.Types.ObjectId,
      ref: "DistributionPoint",
      required: [true, "Please provide Distribution Point Id"],
    },
    talukaId: {
      type: mongoose.Types.ObjectId,
      ref: "Taluka",
      required: [true, "Please provide TalukaId"],
    },
    khataId: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
    },
    requestStatus: {
      type: String,
      enum: ["ACCEPTED", "REJECTED", "PENDING"],
      default: "PENDING",
    },
    rejectReason: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

FarmerSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!);
};

export default mongoose.model("Farmer", FarmerSchema);
