import React, { useEffect, useState } from "react";
import { fetchAllCategories, createContent } from "../api/contentService";
import CreateContentForm from "../forms/CreateContentForm";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function CreateContentPage() {
  const [categories, setCategories] = useState([]);
  const writerId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        const names = (Array.isArray(data.data) ? data.data : []).map(
          (cat) => cat.name
        );
        setCategories(names);
        console.log("Fetched categories:", names);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  const handleFormSubmit = (formData) => {
    createContent({ ...formData, writerId: writerId })
      .then((data) => {
        toast.success("Content created successfully!");
      })
      .catch((err) => {
        toast.error("Failed to create content");
      });
  };

  return (
    <CreateContentForm onSubmit={handleFormSubmit} categories={categories} />
  );
}

export default CreateContentPage;
