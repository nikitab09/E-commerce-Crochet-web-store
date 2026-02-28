import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeItem, clearCart, updateQuantity } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

    return (
        <div className="section">
            <button
                className="btn back-btn"
                onClick={() => navigate("/#products")}
            >
                ← 
            </button>
            <h2>Your Cart 🛒</h2>

            {cartItems.length === 0 ? (
                <div className="card">
                    <p>No items in cart.</p>
                </div>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="card" style={itemBox}>

                            {/* REMOVE BUTTON (Top Right) */}
                            <button
                                style={removeBtn}
                                onClick={() => removeItem(item.id)}
                            >
                                ✖
                            </button>

                            <div style={content}>

                                {/* IMAGE (Left Small) */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={image}
                                />

                                {/* DETAILS */}
                                <div style={details}>
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price}</p>

                                    {/* QUANTITY (Bottom Right) */}
                                    <div style={bottomRow}>
                                        <div style={qtyBox}>
                                            <button
                                                style={qtyBtn}
                                                onClick={() =>
                                                    updateQuantity(item.id, (item.quantity || 1) - 1)
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity || 1}</span>

                                            <button
                                                style={qtyBtn}
                                                onClick={() =>
                                                    updateQuantity(item.id, (item.quantity || 1) + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                    {/* TOTAL PRICE */}
                    <div className="card" style={totalBox}>
                        <h3>Total: ₹{totalPrice}</h3>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={actions}>
                        <button className="btn" onClick={clearCart}>
                            Clear Cart
                        </button>

                        <Link to="/checkout" className="btn" style={checkoutBtn}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

/* ----- STYLES ----- */

const itemBox = {
    position: "relative",
    padding: "15px ",
    marginBottom: "20px",
    textAlign: "left"
    
};

const removeBtn = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#ff4f81"
};

const content = {
    display: "flex",
    gap: "15px",
    alignItems: "center"
};

const image = {
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    objectFit: "cover"
};

const details = {
    flex: 1
};

const bottomRow = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
};

const qtyBox = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
};

const qtyBtn = {
    background: "#ff4f81",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer"
};

const totalBox = {
    marginTop: "20px",
    padding: "15px",
    background: "#fdf6f9",
    borderRadius: "12px",
    textAlign: "center"
};

const actions = {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "15px"
};

const checkoutBtn = {
    background: "#28a745",
    color: "white",
    textDecoration: "none"
};
const backButton = {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "15px",
    color: "#000"
};

export default Cart;