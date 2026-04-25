import supabase from "../../lib/Supabase/Supabase";


// ── GET CART with all items (joined with products & variants) ──
export const getCart = async (userId) => {
  const { data, error } = await supabase
    .from("carts")
    .select(`
      *,
      cart_items (
        *,
        product_variants (*),
        products (*)
      )
    `)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = "no rows returned" (user has no cart yet) — not a real error
    console.error("getCart error:", error.message);
  }

  return data;
};


// ── GET or CREATE cart for user ──
const getOrCreateCart = async (userId) => {
  let { data: cart } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!cart) {
    const { data, error } = await supabase
      .from("carts")
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (error) throw new Error("Failed to create cart: " + error.message);
    cart = data;
  }

  return cart;
};


// ── ADD TO CART (upserts — if item exists, increments quantity) ──
export const addToCart = async (userId, productId, variantId, quantity = 1) => {
  const cart = await getOrCreateCart(userId);

  // Check if item already exists in cart
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .eq("variant_id", variantId)
    .single();

  if (existing) {
    // Update quantity
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);

    if (error) throw new Error("Failed to update cart item: " + error.message);
  } else {
    // Insert new item
    const { error } = await supabase
      .from("cart_items")
      .insert([{
        cart_id: cart.id,
        product_id: productId,
        variant_id: variantId,
        quantity
      }]);

    if (error) throw new Error("Failed to add cart item: " + error.message);
  }
};


// ── REMOVE item from cart ──
export const removeFromCart = async (cartItemId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) throw new Error("Failed to remove cart item: " + error.message);
};


// ── UPDATE item quantity ──
export const updateCartItemQty = async (cartItemId, newQuantity) => {
  if (newQuantity < 1) return;

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: newQuantity })
    .eq("id", cartItemId);

  if (error) throw new Error("Failed to update quantity: " + error.message);
};


// ── CLEAR entire cart (delete all items) ──
export const clearCartItems = async (cartId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) throw new Error("Failed to clear cart: " + error.message);
};