import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewContentComponent from "../components/ViewContentComponent";
import { fetchContentById } from "../api/contentService";

export default function ViewContentPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!content) return <div className="p-6">No content found.</div>;

  return <ViewContentComponent content={content} />;
}
