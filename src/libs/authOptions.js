import { getServerSession } from "next-auth";
import clientPromise from "../libs/mongoConnect";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Patient } from "../models/Patient";
import { Doctor } from "../models/Doctor";
import { UserInfo } from "../models/UserInfo"; // Import UserInfo model
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const email = credentials?.email;
        const password = credentials?.password;

        // Check if the user is a doctor
        let user = await Doctor.findOne({ email });
        if (!user) {
          // If not a doctor, check if the user is a patient
          user = await Patient.findOne({ email });
        }

        // If user exists and password is correct
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();

      if (account.provider === 'google') {
        let existingUser = await Doctor.findOne({ email: profile.email });
        let role = 'patient'; // Default role

        if (!existingUser) {
          existingUser = await Patient.findOne({ email: profile.email });
        }

        if (!existingUser) {
          // Define user data and role
          const newUser = {
            email: profile.email,
            name: profile.name,
            // Add other necessary fields
          };

          // Store Google sign-ins as Patients by default
          existingUser = await Patient.create(newUser);
          role = 'patient';
        } else {
          // Determine role based on existing user
          role = existingUser instanceof Doctor ? 'doctor' : 'patient';
        }

        // Ensure UserInfo is updated or created
        await UserInfo.findOneAndUpdate(
          { email: profile.email },
          { email: profile.email, role: role, admin: false },
          { upsert: true, new: true }
        );
      }

      return true;
    },
    async session({ session, user }) {
      // Add user details to the session
      session.userId = user.id;
      return session;
    }
  }
};


export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}