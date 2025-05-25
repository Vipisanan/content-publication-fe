import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewContentComponent from "../components/ViewContentComponent";
import { editContent, fetchContentById } from "../api/contentService";
import { getUserById } from "../api/AuthService";
import toast from "react-hot-toast";

export default function ViewContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!content) return <div className="p-6">No content found.</div>;

  return (
    <ViewContentComponent
      content={content}
      writer={user}
      handleDelete={(da) => console.log(da)}
      handleEditing={editCatogory}
      userId={userId}
    />
  );
}
