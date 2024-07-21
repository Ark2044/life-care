import { isAdmin } from "../../../libs/authOptions";
import { Doctor } from "../../../models/Doctor";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const doctors = await Doctor.find();
    return Response.json(doctors);
  } else {
    return Response.json([]);
  }
}
