import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    return (
        <div style={productSection}>
            <h2>Wishlist 🤍</h2>

            <div style={productGrid}>
                {wishlist.length === 0 ? (
                    <div className="card">
                        <p>Your wishlist is empty.</p>
                    </div>
                ) : (
                    wishlist.map((item) => (
                        <div key={item.id} className="card" style={{ textAlign: "center" }}>

                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: "100%",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "12px"
                                }}
                                onClick={() => navigate(`/product/${item.id}`)}
                            />

                            <h3 style={{ fontSize: "16px", marginTop: "10px" }}>{item.name}</h3>
                            <p style={{ fontWeight: "600" }}>₹{item.price}</p>

                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                <button
                                    className="btn"
                                    style={{ padding: "6px 12px", fontSize: "12px" }}
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart 🛒
                                </button>

                                <button
                                    className="btn"
                                    style={{ padding: "6px 12px", fontSize: "12px", background: "#ff4d6d" }}
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

/* ---- GRID STYLE (same as home) ---- */

const productSection = {
    padding: "80px 60px",
    background: "#fdf6f9"
};

const productGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, max-content))",
    gap: "30px",
    justifyContent: "center"
};

export default Wishlist;