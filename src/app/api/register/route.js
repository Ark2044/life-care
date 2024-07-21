import { Patient } from "../../../models/Patient";
import { Doctor } from "../../../models/Doctor";
import { User } from "../../../models/User"; // Ensure this path is correct
import { UserInfo } from "../../../models/UserInfo"; // Ensure this path is correct
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const pass = body.password;
    if (!pass?.length || pass.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    // Create User
    const userData = {
      name: body.fname + " " + body.lname,
      email: body.email,
      password: body.password,
      image: body.image,
    };

    const createdUser = await User.create(userData);

    // Create UserInfo
    const userInfoData = {
      email: body.email,
      role: body.userType,
    };

    const createdUserInfo = await UserInfo.create(userInfoData);

    // Link UserInfo to User
    createdUser.userInfo = createdUserInfo._id;
    await createdUser.save();

    // Create Patient or Doctor and link User and UserInfo
    let createdSpecificUser;
    if (body.userType === "doctor") {
      createdSpecificUser = await Doctor.create({
        ...body,
        user: createdUser._id,
        userInfo: createdUserInfo._id,
      });
    } else if (body.userType === "patient") {
      createdSpecificUser = await Patient.create({
        ...body,
        user: createdUser._id,
        userInfo: createdUserInfo._id,
      });
    } else {
      throw new Error("Invalid user type");
    }

    return new Response(JSON.stringify({ createdUser, createdUserInfo, createdSpecificUser }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  } finally {
    mongoose.connection.close();
  }
}
