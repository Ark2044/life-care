import { model, models, Schema } from "mongoose";

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, default: "patient" },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
