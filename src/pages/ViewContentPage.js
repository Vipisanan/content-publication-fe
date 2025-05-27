import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewContentComponent from "../components/ViewContentComponent";
import {
  createComment,
  deleteContentById,
  editContent,
  fetchCommentsByContentId,
  fetchContentById,
} from "../api/contentService";
import { fetchUsersByIds, getUserById } from "../api/AuthService";
import toast from "react-hot-toast";
import CustomModal from "../components/modal/CustomModal";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";

export default function ViewContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

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
    fetchCommentsWithUser(id);
  }, [id]);

  const fetchCommentsWithUser = (contentId) => {
    fetchCommentsByContentId(contentId).then(async (res) => {
      setComments(res.data);
      const userIds = [...new Set(res.data.map((c) => c.userId))];
      console.log("Fetching users for comment userIds:", userIds);
      const usersMap = await fetchUsersByIds(userIds);
      console.log("Fetched users:", usersMap.data);
      const enrichedComments = res.data.map((comment) => ({
        ...comment,
        user: usersMap.data.find((user) => user.id === comment.userId) || null,
      }));
      setComments(enrichedComments);
      console.log("Fetched comments with users:", enrichedComments);
    });
  };

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
    editContent(content.id, data)
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

  const handleAddComment = (text) => {
    const newComment = {
      contentId: id,
      userId: userId,
      text,
    };
    createComment(newComment)
      .then((res) => {
        console.log("Comment added successfully:", res.data);
        toast.success("Comment added successfully");
        fetchCommentsWithUser(id);
      })
      .catch((err) => {
        console.error("Failed to add comment:", err);
        toast.error("Failed to add comment");
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
      <>
        <div className="max-w-2xl mx-auto p-6 border rounded shadow">
          <CommentSection comments={comments} onAddComment={handleAddComment} />
        </div>
      </>
    </>
  );
}
