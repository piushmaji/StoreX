export const formatWishlistItem = (item) => {
  return {
    id: item.id,
    productId: item.product_id,
    name: item.products?.name,
    price: item.products?.price,
    image: item.products?.image_url,
  };
};
