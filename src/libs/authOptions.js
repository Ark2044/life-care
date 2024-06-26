import { getServerSession } from "next-auth";
import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Patient } from "@/models/Patient";
import { Doctor } from "@/models/Doctor";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

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
        const email = credentials?.email;
        const password = credentials?.password;

        await mongoose.connect(process.env.MONGO_URL);
        
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
};
