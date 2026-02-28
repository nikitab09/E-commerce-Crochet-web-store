import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    const isWishlisted = wishlist.some((item) => item.id === product.id);

    const toggleWishlist = () => {
        isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
    };

    return (
        <div style={cardStyle}>

            {/* Wishlist Heart */}
            <button onClick={toggleWishlist} style={wishlistBtn}>
                {isWishlisted ? "❤️" : "🤍"}
            </button>

            <img
                src={product.image}
                alt={product.name}
                style={imageStyle}
            />

            <h3>{product.name}</h3>
            <p style={{ fontWeight: "600" }}>₹{product.price}</p>

            <button
                className="view-btn"
                onClick={() => navigate(`/product/${product.id}`)}
            >
                View Details
            </button>

        </div>
    );
}

/* -------- Styles -------- */

const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s ease",
    position: "relative"
};

const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
};

const wishlistBtn = {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontSize: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
};

export default ProductCard;