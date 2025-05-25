import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewContentComponent from "../components/ViewContentComponent";
import {
  deleteContentById,
  editContent,
  fetchContentById,
} from "../api/contentService";
import { getUserById } from "../api/AuthService";
import toast from "react-hot-toast";
import CustomModal from "../components/modal/CustomModal";

export default function ViewContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContentById(id)
      .then((data) => {
        setContent(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    content?.writerId &&
      getUserById(content?.writerId)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          setError("Failed to fetch user data");
        });
  }, [content]);

  const editCatogory = (data) => {
    editContent(userId, data)
      .then((res) => {
        console.log("Content updated successfully:", res.data);
        toast.success("Content updated successfully:");
      })
      .catch((err) => {
        console.error("Failed to update content:", err);
        toast.error("Failed to update content");
      });
  };
  const handleDelete = () => {
    deleteContentById(id)
      .then(() => {
        toast.success("Content deleted successfully");
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to delete content:", err);
        toast.error("Failed to delete content");
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!content) return <div className="p-6">No content found.</div>;

  return (
    <>
      <CustomModal
        open={showModal}
        type="danger"
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
      <ViewContentComponent
        content={content}
        writer={user}
        handleDelete={() => setShowModal(true)}
        handleEditing={editCatogory}
        userId={userId}
      />
    </>
  );
}
