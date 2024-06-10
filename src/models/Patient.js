import { model, models, Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    fname: { type: String },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number},
    gender: { type: String},
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Patient = models?.Patient || model("Patient", PatientSchema);
