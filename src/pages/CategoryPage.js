import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../api/contentService";
import toast from "react-hot-toast";
import {
  fetchUserSubscriptions,
  subscribeToCategory,
  unsubscribeFromCategory,
} from "../api/NotificationService";
import CategoryListComponent from "../components/CategoryListComponent";
import { useSelector } from "react-redux";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);

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
