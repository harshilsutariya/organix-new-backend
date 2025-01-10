import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const ConsumerScheam = new mongoose.Schema(
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
    fcmToken: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ConsumerScheam.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!);
};

export default mongoose.model("Consumer", ConsumerScheam);
