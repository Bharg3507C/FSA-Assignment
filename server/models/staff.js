import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ["Driver", "Paramedic"] },
  totalShifts: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Staff", staffSchema);