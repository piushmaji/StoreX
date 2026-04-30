import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import supabase from "../../lib/Supabase/Supabase";
import {
  getWishlistItems,
  addToWishlist,
  removeFromWishlist,
} from "../../services/wishlistService/wishListService";

export const WishListContext = createContext(null);

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user + wishlist
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;

      setUser(currentUser);

      if (currentUser) {
        const items = await getWishlistItems(currentUser.id);
        setWishList(items);
      }

      setLoading(false);
    };

    init();
  }, []);

  // 🔹 Toggle wishlist
  const toggleWishList = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const productId = product.id;

    const exists = wishList.some((item) => item.id === productId);

    if (exists) {
      await removeFromWishlist(user.id, productId);

      setWishList((prev) =>
        prev.filter((item) => item.id !== productId),
      );

      toast.error("Removed from Wishlist 💔");
    } else {
      const newItem = await addToWishlist(user.id, productId);

      setWishList((prev) => [...prev, newItem]);

      toast.success("Added to Wishlist ❤️");
    }
  };

  // 🔹 Check
  const isInWishList = (productId) => {
    return wishList.some((item) => item.id === productId);
  };

  // 🔹 Remove directly
  const removeWishListItem = async (productId) => {
    if (!user) return;

    await removeFromWishlist(user.id, productId);

    setWishList((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        toggleWishList,
        isInWishList,
        removeWishListItem,
        loading,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
