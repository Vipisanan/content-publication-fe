import React, { useEffect, useState } from "react";
import { createCategory, fetchAllCategories } from "../api/contentService";
import toast from "react-hot-toast";
import {
  fetchUserSubscriptions,
  subscribeToCategory,
  unsubscribeFromCategory,
} from "../api/NotificationService";
import CategoryListComponent from "../components/CategoryListComponent";
import { useSelector } from "react-redux";
import CategoryForm from "../forms/CategoryForm";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const publisher = useSelector((state) => state.auth.publisher);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, subRes] = await Promise.all([
          fetchAllCategories(),
          fetchUserSubscriptions(userId),
        ]);
        const categories = catRes.data;
        const subscriptions = subRes.data;

        // Extract the set of subscribed category IDs
        const subscribedCategoryIds = new Set(
          subscriptions.map((sub) => sub.categoryId)
        );

        // Map categories and add `subscribed` property
        const categoriesWithSubscription = categories.map((cat) => ({
          ...cat,
          subscribed: subscribedCategoryIds.has(cat.id),
        }));

        setCategories(categoriesWithSubscription);
        console.log("Fetched categories:", categoriesWithSubscription);
      } catch (err) {
        toast.error("Failed to fetch categories or subscriptions");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  // Subscribe/unsubscribe handler
  const handleToggleSubscription = async (catId, isSubscribed) => {
    try {
      if (isSubscribed) {
        // Unsubscribe
        unsubscribeFromCategory(userId, catId)
          .then(() => {
            toast.success("Unsubscribed successfully");
            setCategories((prevCats) =>
              prevCats.map((cat) =>
                cat.id === catId ? { ...cat, subscribed: false } : cat
              )
            );
          })
          .catch(() => {
            toast.error("Failed to unsubscribe");
          });
      } else {
        // Subscribe
        subscribeToCategory(userId, catId)
          .then(() => {
            toast.success("Subscribed successfully");
            setCategories((prevCats) =>
              prevCats.map((cat) =>
                cat.id === catId ? { ...cat, subscribed: true } : cat
              )
            );
          })
          .catch(() => {
            toast.error("Failed to subscribe");
          });
      }
    } catch (err) {
      // handle error (optional: show toast)
    }
  };

  const handleCategorySubmit = async (category) => {
    const data = {
      name: category,
    };
    console.log("Creating category:", data);
    createCategory(data)
      .then((res) => {
        const newCategory = res.data;
        setCategories((prevCats) => [
          ...prevCats,
          { ...newCategory, subscribed: false },
        ]);
        toast.success("Category added successfully");
        setShowAddCategoryForm(false);
      })
      .catch((err) => {
        console.error("Error creating category:", err);
        toast.error("Failed to add category");
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-0">Categories</h2>
        {publisher && (
          <button
            type="button"
            className={`${
              showAddCategoryForm
                ? "bg-gray-300 hover:bg-gray-400 text-black"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded`}
            onClick={() => setShowAddCategoryForm((f) => !f)}
          >
            {showAddCategoryForm ? "Cancel" : "Add Category"}
          </button>
        )}
      </div>
      {showAddCategoryForm && (
        <>
          <div style={{ maxWidth: 400, margin: "2rem auto" }}>
            <CategoryForm onSubmit={handleCategorySubmit} />
          </div>
        </>
      )}
      <CategoryListComponent
        categories={categories}
        onToggleSubscription={handleToggleSubscription}
      />
    </div>
  );
}
