import supabase from "../../lib/Supabase/Supabase";
import { Product } from "../../models/ProductsModel";

// 🔹 Get or create wishlist
export const getOrCreateWishlist = async (userId) => {
  let { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  if (!data) {
    const { data: newWishlist, error: insertError } = await supabase
      .from("wishlist")
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newWishlist;
  }

  return data;
};

// 🔹 Get formatted wishlist items
export const getWishlistItems = async (userId) => {
  const wishlist = await getOrCreateWishlist(userId);

  const { data, error } = await supabase
    .from("wishlist_items")
    .select(
      `
      id,
      product_id,
      products (
        *,
        product_variants (*),
        categories (*),
        product_reviews (*)
      )
    `,
    )
    .eq("wishlist_id", wishlist.id);

  if (error) throw error;

  // ✅ Return array of Product instances
  return data.map((item) => new Product(item.products));
};

// 🔹 Add item
export const addToWishlist = async (userId, productId) => {
  const wishlist = await getOrCreateWishlist(userId);

  const { data, error } = await supabase
    .from("wishlist_items")
    .insert([
      {
        wishlist_id: wishlist.id,
        product_id: productId,
      },
    ])
    .select(
      `
      id,
      product_id,
      products (
        *,
        product_variants (*),
        categories (*),
        product_reviews (*)
      )
    `,
    )
    .single();

  if (error) throw error;

  // ✅ Return single Product instance
  return new Product(data.products);
};

// 🔹 Remove item
export const removeFromWishlist = async (userId, productId) => {
  const wishlist = await getOrCreateWishlist(userId);

  const { error } = await supabase.from("wishlist_items").delete().match({
    wishlist_id: wishlist.id,
    product_id: productId,
  });

  if (error) throw error;

  return true;
};

