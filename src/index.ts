import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import connectDB from "./db/connect";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import SuperAdminRouter from "./routes/superadmin/SuperAdminRoute";
import CropTypeRoute from "./routes/croptype/CropTypeRoute";
import fertilizerRoute from "./routes/fertilizer/FertilizerRoute";
import cropItemRoute from "./routes/cropitem/CropItemRoute";
import TalukaController from "./routes/taluka/TalukaRoute"
import distributionPointRoute from "./routes/DistributionPoint/DistributionPointRoute"
import villageRoute from "./routes/village/VillageRoute"
// connectDB

// error handler
const app = express();
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 request per windowsMs
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/superAdmin", SuperAdminRouter);
app.use("/cropType", CropTypeRoute);
app.use("/fertilizerType", fertilizerRoute);
app.use("/cropItem", cropItemRoute);
app.use("/taluka", TalukaController);
app.use("/distributionPoint", distributionPointRoute);
app.use("/village", villageRoute);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
