import { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (item) => {
        setWishlist((prev) => {
            if (prev.find((p) => p.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter(item => item.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}