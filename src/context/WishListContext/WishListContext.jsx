import { createContext, useContext, useState } from "react";

export const WishListContext = createContext(null)

const [wishList, setWishList] = useState([])

export const WishListProvider = ({ children }) => {



    return <WishListContext.Provider value={{ wishList, setWishList }}>
        {children}
    </WishListContext.Provider>
}


export const useWishList = () => useContext(WishListContext)