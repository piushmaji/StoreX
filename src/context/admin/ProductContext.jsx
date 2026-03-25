import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../../lib/Supabase/Supabase";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // GET PRODUCTS
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (!error) setProducts(data);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*");
      setCategories(data);
    };
    fetchCategories();
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (product, files) => {
    const productId = crypto.randomUUID();
    const imageUrls = [];

    for (let file of files) {
      const cleanName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "");

      const filePath = `${productId}/${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      imageUrls.push(data.publicUrl);
    }

    const { data, error } = await supabase
      .from("products")
      .insert([{
        id: productId,
        ...product,
        image_urls: imageUrls,
      }])
      .select();

    if (error) {
      console.error("DB ERROR:", error);
      throw error;
    }

    setProducts(prev => [...prev, data[0]]);
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, updatedFields, newFiles = []) => {
    const imageUrls = [];

    // Upload only new files
    for (let file of newFiles) {
      const cleanName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "");

      const filePath = `${id}/${Date.now()}-${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      imageUrls.push(data.publicUrl);
    }

    // Merge existing kept URLs + newly uploaded URLs
    const finalImageUrls = [
      ...(updatedFields.image_urls || []),
      ...imageUrls,
    ];

    const payload = {
      ...updatedFields,
      image_urls: finalImageUrls,
    };

    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("UPDATE ERROR:", error);
      throw error;
    }

    setProducts(prev => prev.map(p => p.id === id ? data[0] : p));
    return data[0];
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      console.error("Error deleting product:", error);
    }
  };

  // TOGGLE VISIBILITY
  const toggleVisibility = async (id, currentVisibility) => {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: !currentVisibility })
      .eq("id", id);
    if (!error) {
      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, is_visible: !currentVisibility } : p
      ));
    } else {
      console.error("Error updating visibility:", error);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      fetchProducts,
      addProduct,
      updateProduct,
      categories,
      deleteProduct,
      toggleVisibility,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);