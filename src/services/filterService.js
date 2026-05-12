import supabase from "../lib/Supabase/Supabase";

/**
 * Fetches unique filter options dynamically from Supabase
 * Production architecture: Extracts unique values for UI presentation.
 */
export const fetchFilterOptions = async () => {
  try {
    // 1. Fetch categories
    const { data: categories } = await supabase
      .from("categories")
      .select("id, name");

    // 2. Fetch product fields (brand, material, style) for deduplication
    // In a massive production DB, this might use an RPC call or distinct view,
    // but for standard e-commerce, this approach is common.
    const { data: products } = await supabase
      .from("products")
      .select("brand, material, style");

    // 3. Fetch variant fields (color, size)
    const { data: variants } = await supabase
      .from("product_variants")
      .select("color, size");

    // Deduplicate arrays and remove null/empty values
    const brands = [...new Set(products?.map((p) => p.brand).filter(Boolean))];
    const materials = [
      ...new Set(products?.map((p) => p.material).filter(Boolean)),
    ];
    const styles = [...new Set(products?.map((p) => p.style).filter(Boolean))];
    const colors = [...new Set(variants?.map((v) => v.color).filter(Boolean))];
    const sizes = [...new Set(variants?.map((v) => v.size).filter(Boolean))];

    // Fallbacks if db is empty (per requirements to show clothing items)
    return {
      categories: categories || [],
      brands: brands.length
        ? brands
        : ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levis", "Uniqlo"],
      materials: materials.length
        ? materials
        : ["Cotton", "Polyester", "Denim", "Wool", "Leather"],
      styles: styles.length
        ? styles
        : ["Casual", "Formal", "Sport", "Streetwear", "Vintage"],
      colors: colors.length
        ? colors
        : ["Black", "White", "Red", "Blue", "Green", "Grey"],
      sizes: sizes.length ? sizes : ["XS", "S", "M", "L", "XL", "XXL"],
    };
  } catch (error) {
    console.error("Error fetching dynamic filters from Supabase:", error);
    // Return safe fallbacks on error
    return {
      categories: [],
      brands: ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levis", "Uniqlo"],
      materials: ["Cotton", "Polyester", "Denim", "Wool", "Leather"],
      styles: ["Casual", "Formal", "Sport", "Streetwear", "Vintage"],
      colors: ["Black", "White", "Red", "Blue", "Green", "Grey"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    };
  }
};
