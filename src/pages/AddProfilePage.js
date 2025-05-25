import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../api/AuthService";
import toast from "react-hot-toast";
import ProfileForm from "../forms/ProfileForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPublisher } from "../store/authSlice";

export default function AddProfilePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  async function handleAddProfile(data) {
    setLoading(true);
    console.log(userId, data);
    addProfile(userId, data)
      .then((res) => {
        dispatch(setPublisher({ publisher: true }));
        toast.success("Profile added successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to add profile:", err);
        toast.error("Failed to add profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <ProfileForm onSubmit={handleAddProfile} loading={loading} />
      </div>
    </div>
  );
}
