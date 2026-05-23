import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import staffRoutes from "./routes/staffRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/staff", staffRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/schedule", scheduleRoutes);

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});