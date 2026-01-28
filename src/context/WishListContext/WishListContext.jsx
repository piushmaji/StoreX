import { createContext, useContext, useState } from "react";

export const WishListContext = createContext(null)



export const WishListProvider = ({ children }) => {



    return <WishListContext.Provider value={{}}>
        {children}
    </WishListContext.Provider>
}


export const useWishList = () => useContext(WishListContext)