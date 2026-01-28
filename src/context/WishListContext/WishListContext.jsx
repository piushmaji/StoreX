import { createContext, useContext, useState } from "react";


export const WishListContext = createContext(null)


export const WishListProvider = ({ children }) => {


    const [wishList, setWishList] = useState([])

    const toggleWishList = ((product) => {
        setWishList((prev) => {
            const exist = prev.find((item) => item.id === product.id);

            if (exist) {
                return prev.filter((item) => item.id !== product.id)
            }

            return [...prev, product];
        })
    })

    const isInWishList = ((id) => {
        return wishList.some(item => item.id === id)
    })

    const removeWishListItem = (id) => {
        setWishList((prev) =>
            prev.filter((item) => item.id !== id)
        )
    }

    return <WishListContext.Provider value={{ wishList, setWishList, toggleWishList, isInWishList, removeWishListItem }}>
        {children}
    </WishListContext.Provider>
}


export const useWishList = () => useContext(WishListContext)