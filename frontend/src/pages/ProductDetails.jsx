import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    const [animate, setAnimate] = useState(false);

    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    const isWishlisted = product
        ? wishlist.some(item => item._id === product._id)
        : false;
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5050/api/products/${id}`
                );
                setProduct(data);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchProduct();
    }, [id]);



    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${quantity} item(s) added to cart!`);
    };

    return (
        <div style={{ position: "relative", padding: "20px" }}>
            <button style={backButton} onClick={() => navigate(-1)}>
                ←
            </button>

            <div style={containerStyle}>

                <div style={cardStyle}>

                    {/* IMAGE CONTAINER WITH QUANTITY CORNER */}
                    <div style={imageContainer}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={imageStyle}
                        />
                        <button
                            style={{
                                ...wishlistBtn,
                                transform: animate ? "scale(1.3)" : "scale(1)",
                                transition: "transform 0.2s ease"
                            }}
                            onClick={() => {
                                setAnimate(true);

                                if (isWishlisted) {
                                    removeFromWishlist(product._id);
                                } else {
                                    addToWishlist(product);
                                }

                                setTimeout(() => setAnimate(false), 200);
                            }}
                        >
                            {isWishlisted ? "❤️" : "🤍"}
                        </button>

                        {/* Quantity Selector (Corner) */}
                        <div style={quantityCorner}>
                            <button style={qtyButton} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                                -
                            </button>
                            <span style={qtyText}>{quantity}</span>
                            <button style={qtyButton} onClick={() => setQuantity(quantity + 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <h2>{product.name}</h2>
                    <p style={priceStyle}>₹{product.price}</p>

                    {/* PRODUCT DETAILS */}
                    <div style={detailsBox}>
                        <p><strong>Length:</strong> {product.length}</p>
                        <p><strong>Width:</strong> {product.width}</p>
                        <p><strong>Fabric:</strong> {product.fabric}</p>
                        <p><strong>Wash:</strong> {product.wash}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                    </div>

                    {/* Add to Cart */}
                    <button style={addToCartBtn} onClick={handleAddToCart}>
                        Buy Now
                    </button>


                </div>
            </div>
        </div>
    );
}

/* -------- Styles -------- */

const containerStyle = {
    padding: "50px",
    display: "flex",
    justifyContent: "center"
};

const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    maxWidth: "400px"
};

const imageContainer = {
    position: "relative",
    width: "100%"
};

const imageStyle = {
    width: "100%",
    borderRadius: "15px"
};

const quantityCorner = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "rgba(255,255,255,0.9)",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const qtyButton = {
    border: "none",
    background: "#ff4f81",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer"
};

const qtyText = {
    margin: "0 10px",
    fontWeight: "600"
};

const priceStyle = {
    fontSize: "20px",
    fontWeight: "600"
};

const addToCartBtn = {
    padding: "12px 25px",
    background: "#ff4f81",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer"
};

const detailsBox = {
    marginTop: "20px",
    padding: "15px",
    background: "#fdf6f9",
    borderRadius: "12px",
    textAlign: "left",
    lineHeight: "1.6"
};
const backButton = {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "none",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#000"
};
const wishlistBtn = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

export default ProductDetails;