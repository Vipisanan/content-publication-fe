import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../api/AuthService";
import toast from "react-hot-toast";
import ProfileForm from "../forms/ProfileForm";

export default function AddProfilePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  async function handleAddProfile(data) {
    setLoading(true);
    try {
      addProfile(userId, data).then((res) => {
        console.log("Profile added successfully:", res.data);
        toast.success("Profile added successfully!");
      });
      navigate("/");
    } catch (err) {
      toast.error("Failed to add profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <ProfileForm onSubmit={handleAddProfile} loading={loading} />
      </div>
    </div>
  );
}
