import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../api/contentService";
import toast from "react-hot-toast";
import { fetchUserSubscriptions } from "../api/NotificationService";
import CategoryListComponent from "../components/CategoryListComponent";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, subRes] = await Promise.all([
          fetchAllCategories(),
          fetchUserSubscriptions(localStorage.getItem("userId")),
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
  }, []);

  // Subscribe/unsubscribe handler
  const handleToggleSubscription = async (catId, isSubscribed) => {
    try {
      if (isSubscribed) {
        // Unsubscribe
        await fetch(`/api/categories/${catId}/unsubscribe`, { method: "POST" });
        setSubscribed(subscribed.filter((id) => id !== catId));
      } else {
        // Subscribe
        await fetch(`/api/categories/${catId}/subscribe`, { method: "POST" });
        setSubscribed([...subscribed, catId]);
      }
    } catch (err) {
      // handle error (optional: show toast)
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <CategoryListComponent
        categories={categories}
        onToggleSubscription={handleToggleSubscription}
      />
    </div>
  );
}
