import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav style={navStyle}>
            <div style={navLeft}>
                <h2 style={logo}>Crochet Store 🧶</h2>

                <div style={navLinks}>
                    <a href="#products" className="nav-link">Search</a>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/login" className="nav-link">Signin / Signup</Link>
                </div>
            </div>

            {/* RIGHT SIDE ICONS (Wishlist + Cart) */}
            <div style={rightIcons}>

                {/* WISHLIST ICON */}
                <Link to="/wishlist" style={wishlistIcon}>
                    {wishlist.length > 0 ? "❤️" : "🤍"}

                    {wishlist.length > 0 && (
                        <span style={cartBadge}>{wishlist.length}</span>
                    )}
                </Link>

                {/* CART WITH BADGE */}
                <Link to="/cart" style={cartWrapper}>
                    <span className="cart-bounce">🛒</span>

                    {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) > 0 && (
                        <span style={cartBadge}>
                            {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}

/* ----- Styles ----- */

const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1000
};

const navLeft = {
    display: "flex",
    alignItems: "center",
    gap: "40px"
};

const logo = {
    fontSize: "24px",
    fontWeight: "600"
};

const navLinks = {
    display: "flex",
    gap: "20px"
};

const rightIcons = {
    display: "flex",
    alignItems: "center",
    gap: "20px"
};

const wishlistIcon = {
    position: "relative",
    fontSize: "24px",
    textDecoration: "none",
    cursor: "pointer"
};

const cartWrapper = {
    position: "relative",
    fontSize: "24px",
    textDecoration: "none"
};

const cartBadge = {
    position: "absolute",
    top: "-6px",
    right: "-8px",
    background: "#ff4f81",
    color: "white",
    fontSize: "12px",
    borderRadius: "50%",
    padding: "2px 6px",
    fontWeight: "600"
};

export default Navbar;