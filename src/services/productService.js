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

export const getPaginatedProducts = async ({ page = 1, limit = 10, filters = {} }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Determine if we need to filter by product_variants (using inner join)
  const hasVariantFilters = 
    filters.colors?.length > 0 || 
    filters.sizes?.length > 0 || 
    filters.minPrice > 0 || 
    filters.maxPrice < 10000;

  // If we have variant filters, we must use !inner to enforce the filter on the parent product
  let selectQuery = `*, categories (*), product_reviews (*)`;
  if (hasVariantFilters) {
    selectQuery += `, product_variants!inner (*)`;
  } else {
    selectQuery += `, product_variants (*)`;
  }

  let query = supabase
    .from("products")
    .select(selectQuery, { count: "exact" });
  // Apply Product-level filters
  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }
  if (filters.brands?.length > 0) {
    query = query.in('brand', filters.brands);
  }
  if (filters.materials?.length > 0) {
    query = query.in('material', filters.materials);
  }
  if (filters.styles?.length > 0) {
    query = query.in('style', filters.styles);
  }
  if (filters.rating) {
    query = query.gte('rating', filters.rating);
  }

  // Apply Variant-level filters
  if (filters.minPrice > 0) {
    query = query.gte('product_variants.price', filters.minPrice);
  }
  if (filters.maxPrice < 10000) {
    query = query.lte('product_variants.price', filters.maxPrice);
  }
  if (filters.colors?.length > 0) {
    query = query.in('product_variants.color', filters.colors);
  }
  if (filters.sizes?.length > 0) {
    query = query.in('product_variants.size', filters.sizes);
  }

  const { data, error, count } = await query
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return {
    data: data.map((item) => new Product(item)),
    count,
  };
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
