import { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            // prevent duplicates
            if (prev.some((item) => item._id === product._id)) {
                return prev;
            }

            // add new item correctly
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) =>
            prev.filter((item) => item._id !== id)
        );
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};