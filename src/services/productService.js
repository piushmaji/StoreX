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

export const getPaginatedProducts = async ({
  page = 1,
  limit = 10,
  filters = {},
}) => {
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

  let query = supabase.from("products").select(selectQuery, { count: "exact" });
  // Apply Product-level filters
  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,id.ilike.%${filters.search}%`);
  }
  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }
  if (filters.brand && filters.brand !== "All") {
    query = query.eq("brand", filters.brand);
  }
  if (filters.brands?.length > 0) {
    query = query.in("brand", filters.brands);
  }
  if (filters.materials?.length > 0) {
    query = query.in("material", filters.materials);
  }
  if (filters.styles?.length > 0) {
    query = query.in("style", filters.styles);
  }
  if (filters.rating) {
    query = query.gte("rating", filters.rating);
  }

  // Apply Variant-level filters
  if (filters.minPrice > 0) {
    query = query.gte("product_variants.price", filters.minPrice);
  }
  if (filters.maxPrice < 10000) {
    query = query.lte("product_variants.price", filters.maxPrice);
  }
  if (filters.colors?.length > 0) {
    query = query.in("product_variants.color", filters.colors);
  }
  if (filters.sizes?.length > 0) {
    query = query.in("product_variants.size", filters.sizes);
  }

  const { data, error, count } = await query
    .range(from, to)
    .order("created_at", { ascending: false });

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

export const fetchReviewerProfiles = async (userIds) => {
  if (!userIds.length) return {};
  try {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", userIds);

    if (profiles) {
      return Object.fromEntries(
        profiles.map((p) => [
          p.id,
          { name: p.full_name, avatarUrl: p.avatar_url },
        ]),
      );
    }
  } catch {
    // timeout — fallback to empty object
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

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      categories (*)
    `,
    )
    .eq("is_featured", true)
    .limit(8);

  if (error) throw error;

  return data.map((item) => new Product(item));
};

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      categories (*),
      product_reviews (*)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return new Product(data);
};

//Get Products By categories
export const getProductsByCategory = async (categorySlug) => {
  // First, find the category ID by name (case-insensitive)
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id, name")
    .ilike("name", categorySlug)
    .single();

  if (categoryError || !categoryData) {
    // Fallback: search by gender field if category not found
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        product_variants (*),
        categories (*)
      `,
      )
      .ilike("gender", categorySlug);

    if (error) throw error;
    return data.map((item) => new Product(item));
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      categories (*)
    `,
    )
    .eq("category_id", categoryData.id);

  if (error) throw error;
  return data.map((item) => new Product(item));
};

//Create Products
export const createProduct = async ({ productData, variants, imageFiles }) => {
  // Upload images
  const uploadedUrls = [];

  for (const file of imageFiles) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    uploadedUrls.push(data.publicUrl);
  }

  // Insert product
  const { data: product, error } = await supabase
    .from("products")
    .insert([
      {
        ...productData,

        image_urls: uploadedUrls,

        thumbnail: uploadedUrls[0],
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Insert variants
  const variantPayload = variants.map((v) => ({
    product_id: product.id,

    size: v.size,

    color: v.color,

    stock: Number(v.stock),

    price: Number(v.price),

    discount_price: v.discountPrice ? Number(v.discountPrice) : null,
  }));

  const { error: variantError } = await supabase
    .from("product_variants")
    .insert(variantPayload);

  if (variantError) throw variantError;

  // Price history
  await supabase.from("price_history").insert([
    {
      product_id: product.id,
      price: variants[0].price,
    },
  ]);

  return new Product(product);
};

//Delete Products
export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) throw error;

  return true;
};

//Update Products
export const updateProduct = async ({ productId, productData }) => {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", productId)
    .select()
    .single();

  if (error) throw error;

  return new Product(data);
};

//Update Variant
export const updateVariant = async ({ variantId, variantData }) => {
  const { data, error } = await supabase
    .from("product_variants")
    .update(variantData)
    .eq("id", variantId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

//Get Product By Id
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_variants (*),
      categories (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return new Product(data);
};

//Get All Categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) throw error;
  return data;
};
