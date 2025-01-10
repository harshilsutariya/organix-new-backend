import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const SuperAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      unique: false,
    },
    mobileNo: {
      type: String,
      minlength: [10, "Mobile number must be at least 10 characters long"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SuperAdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  if (this.password && this.password.length > 0) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

SuperAdminSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!);
};

SuperAdminSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export default mongoose.model("SuperAdmin", SuperAdminSchema);
