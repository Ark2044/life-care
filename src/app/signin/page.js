// pages/auth/signin.js

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signIn("google", {
      callbackUrl: `/auth/select-role?email=${email}&role=${role}`,
    });
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
