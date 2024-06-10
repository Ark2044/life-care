import { model, models, Schema } from "mongoose";

const DoctorSchema = new Schema(
  {
    fname: { type: String },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    gender: { type: String },
    speciality: { type: String },
    experience: { type: String },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Doctor = models?.Doctor || model("Doctor", DoctorSchema);
