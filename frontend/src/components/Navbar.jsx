import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar() {

    const { cartItems } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);

    const navigate = useNavigate(); // ✅ FIX
    const user = JSON.parse(localStorage.getItem("user"));
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav style={navStyle}>
            <div style={navLeft}>
                <h2 style={logo}>Crochet Store 🧶</h2>

                <div style={navLinks}>
                    <a href="#products" className="nav-link">Search</a>
                    <Link to="/" className="nav-link">Home</Link>

                    {!user ? (
                        <Link to="/login" className="nav-link">
                            Signin / Signup
                        </Link>
                    ) : (
                        <div style={accountWrapper}>

                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                style={accountBtn}
                            >
                                👤 My Account
                            </button>

                            {showMenu && (
                                <div style={dropdownMenu}>

                                    <div style={accountHeader}>
                                        <strong>{user.name}</strong>
                                        <p style={{ fontSize: "12px" }}>{user.email}</p>
                                    </div>

                                    <Link to="/profile" style={menuItem}>
                                        👤 My Profile
                                    </Link>

                                    <Link to="/my-orders" style={menuItem}>
                                        📦 My Orders
                                    </Link>

                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE ICONS */}
            <div style={rightIcons}>

                {/* WISHLIST */}
                <Link to="/wishlist" style={wishlistIcon}>
                    {wishlist.length > 0 ? "❤️" : "🤍"}

                    {wishlist.length > 0 && (
                        <span style={cartBadge}>{wishlist.length}</span>
                    )}
                </Link>

                {/* CART */}
                <Link to="/cart" style={cartWrapper}>
                    <span className="cart-bounce">🛒</span>

                    {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) > 0 && (
                        <span style={cartBadge}>
                            {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </span>
                    )}
                </Link>

                {/* LOGOUT BUTTON */}
                {user && (
                    <button onClick={logout} style={logoutBtn}>
                        Logout
                    </button>
                )}

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
const logoutBtn = {
    padding: "6px 12px",
    border: "none",
    background: "#ff4f81",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};
const accountWrapper = {
    position: "relative"
};

const accountBtn = {
    background: "none",
    border: "none",
    fontWeight: "600",
    cursor: "pointer"
};

const dropdownMenu = {
    position: "absolute",
    top: "35px",
    right: 0,
    background: "#fff",
    width: "200px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 100
};

const accountHeader = {
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
    marginBottom: "5px"
};

const menuItem = {
    padding: "8px",
    textDecoration: "none",
    color: "#333",
    border: "none",
    background: "none",
    textAlign: "left",
    cursor: "pointer"
};
export default Navbar;