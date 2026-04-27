import supabase from "../lib/Supabase/Supabase";
import { Product } from "../models/ProductsModel";

export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select(`
      *,
      product_variants (*),
      categories (*),
      product_reviews (*)
    `);

  if (error) throw error;

  return data.map((item) => new Product(item));
};

// Separate lightweight call — only used by ReviewsTab
export const fetchReviewerNames = async (userIds) => {
  if (!userIds.length) return {};
  try {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", userIds);

    if (profiles) {
      return Object.fromEntries(profiles.map((p) => [p.id, p.full_name]));
    }
  } catch {
    // timeout — fallback to "User"
  }
  return {};
};

export const addReview = async ({
  productId,
  userId,
  rating,
  body,
  images,
}) => {
  const { data, error } = await supabase.from("product_reviews").insert({
    product_id: productId,
    user_id: userId,
    rating,
    review_text: body,
    review_images: images,
  });

  if (error) throw error;
  return data;
};
