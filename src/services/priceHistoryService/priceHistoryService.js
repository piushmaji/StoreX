import supabase from "../../lib/Supabase/Supabase";

export async function getPriceHistory(productId) {
  const { data, error } = await supabase
    .from("price_history")
    .select("*")
    .eq("product_id", productId)
    .order("recorded_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
