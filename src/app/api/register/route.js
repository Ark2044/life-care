import { Patient } from "../../../models/Patient";
import { Doctor } from "../../../models/Doctor";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);

    const pass = body.password;
    if (!pass?.length || pass.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    let createdUser;
    if (body.userType === "doctor") {
      createdUser = await Doctor.create(body);
    } else if (body.userType === "patient") {
      createdUser = await Patient.create(body);
    } else {
      throw new Error("Invalid user type");
    }

    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
