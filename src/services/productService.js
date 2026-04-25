import supabase from "../lib/Supabase/Supabase";
import { Product } from "../models/ProductsModel";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (*),
      categories (*),
      product_reviews (*)
    `);

  if (error) throw error;

  return data.map(item => {
    const product = new Product(item);
    return product;
  });
};