import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: quantity > 0 ? quantity : 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeItem,
            clearCart,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};