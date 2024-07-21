import { isAdmin } from "../../../libs/authOptions";
import { Patient } from "../../../models/Patient";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const patients = await Patient.find();
    return Response.json(patients);
  } else {
    return Response.json([]);
  }
}
