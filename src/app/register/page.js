"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RegisterPage() {
  const path = usePathname();

  const [formType, setFormType] = useState("patient");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const formData = {
      fname,
      lname,
      email,
      age,
      gender,
      password,
      userType: formType,
    };

    if (formType === "doctor") {
      formData.specialty = specialty;
      formData.experience = experience;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <div className="flex justify-center gap-4 mb-4 tabs">
        <Link
          href="#"
          onClick={() => setFormType("patient")}
          className={`px-4 py-2 ${
            formType === "patient" ? "active" : "text-gray-500"
          }`}
        >
          Patient
        </Link>
        <Link
          href="#"
          onClick={() => setFormType("doctor")}
          className={`px-4 py-2 ${
            formType === "doctor" ? "active" : "text-gray-500"
          }`}
        >
          Doctor
        </Link>
      </div>
      {userCreated && (
        <div className="my-4 text-center">
          User created.
          <br />
          Now you can{" "}
          <Link href="/login" className="underline">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={fname}
          disabled={creatingUser}
          onChange={(ev) => setFname(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lname}
          disabled={creatingUser}
          onChange={(ev) => setLname(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          disabled={creatingUser}
          onChange={(ev) => setAge(ev.target.value)}
        />
        <select
          value={gender}
          disabled={creatingUser}
          onChange={(ev) => setGender(ev.target.value)}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {formType === "doctor" && (
          <>
            <input
              type="text"
              placeholder="Specialty"
              value={specialty}
              disabled={creatingUser}
              onChange={(ev) => setSpecialty(ev.target.value)}
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              disabled={creatingUser}
              onChange={(ev) => setExperience(ev.target.value)}
            />
          </>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" alt="Google" width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link href="/login" className="underline">
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
