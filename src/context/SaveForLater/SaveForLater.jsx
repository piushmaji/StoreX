import { createContext, useContext, useEffect, useState } from "react";

export const SaveForLaterContext = createContext(null)

export const SaveForLaterProvider = ({ children }) => {

    const [savedItem, setSavedItem] = useState(() => {
        const saved = localStorage.getItem("saved");
        return saved ? JSON.parse(saved) : [];
    })
    useEffect(() => {

        localStorage.setItem("saved", JSON.stringify(savedItem))

    }, [savedItem])

    const addToSaved = (product) => {
        setSavedItem((prev) => {
            const productId = product.id || product._id || product.productId

            const exists = prev.find((item) => {
                const itemId = item.id || item._id || item.productId
                return String(itemId) === String(productId)
            })

            if (exists) return prev
            return [...prev, { ...product, id: productId }]
        })
    }

    const removeFromSaved = (id) => {
        setSavedItem((prev) => prev.filter((item) => item.id !== id))
    }

    return <SaveForLaterContext.Provider value={{ savedItem, addToSaved, removeFromSaved }}>
        {children}
    </SaveForLaterContext.Provider>
}

export const useSaveForLater = () => useContext(SaveForLaterContext)