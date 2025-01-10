// const mongoose = require("mongoose");
import mongoose from "mongoose";

export default (url: string) => {
  return mongoose.connect(url);
};
