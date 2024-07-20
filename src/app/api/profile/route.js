import { authOptions } from "../../../libs/authOptions";
import { Doctor } from "../../../models/Doctor";
import { Patient } from "../../../models/Patient";
import { UserInfo } from "../../../models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { _id, role, fname, lname, image, ...otherInfo } = data;

    let filter = {};
    if (_id) {
      filter = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      filter = { email };
    }

    // Update UserInfo
    await UserInfo.updateOne(filter, { role });

    let model;
    if (role === 'doctor') {
      model = Doctor;
    } else if (role === 'patient') {
      model = Patient;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid role specified' }), { status: 400 });
    }

    const user = await model.findOne(filter);
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await model.updateOne(filter, { fname, lname, image });
    await model.findOneAndUpdate({ email: user.email }, otherInfo, { upsert: true });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    const role = url.searchParams.get("role");

    let filterUser = {};
    if (_id) {
      filterUser = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return new Response(JSON.stringify({}), { status: 200 });
      }
      filterUser = { email };
    }

    // Fetch role from UserInfo
    const userInfo = await UserInfo.findOne(filterUser).lean();
    if (!userInfo) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    let model;
    if (userInfo.role === 'doctor') {
      model = Doctor;
    } else if (userInfo.role === 'patient') {
      model = Patient;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid role specified' }), { status: 400 });
    }

    const user = await model.findOne(filterUser).lean();
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
