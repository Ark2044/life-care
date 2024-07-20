"use client";

import UserForm from "../../components/layout/UserForm";
import UserTabs from "../../components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        let response = await fetch("/api/profile?role=doctor&email=" + session.user.email);
        let data = await response.json();

        if (!data.email) {
          response = await fetch("/api/profile?role=patient&email=" + session.user.email);
          data = await response.json();
        }

        if (data.email) {
          setUser(data);
          setIsAdmin(data.admin);
        } else {
          console.error("No profile found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setProfileFetched(true);
      }
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          resolve();
        } else {
          reject(new Error("Failed to save profile"));
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving profile",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  if (!user) {
    return <p>No profile found.</p>;
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
