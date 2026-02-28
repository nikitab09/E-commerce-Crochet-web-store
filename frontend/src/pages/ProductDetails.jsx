import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const products = [
        {
            id: 1,
            name: "Lavender Bloom Tote",
            price: 1299,
            image: "/images/lavender-bloom-tote.jpg",
            length: "12 inches",
            width: "10 inches",
            fabric: "100% Cotton Yarn",
            wash: "Hand wash with mild detergent",
            description: "A stylish handmade tote perfect for everyday use."
        },
        {
            id: 2,
            name: "Daisy Whisper Bucket Hat",
            price: 899,
            image: "/images/daisy-whisper-bucket-hat.jpg",
            length: "9 inches",
            width: "8 inches",
            fabric: "Cotton Blend",
            wash: "Hand wash, air dry",
            description: "Soft and trendy bucket hat for summer vibes."
        },
        {
            id: 3,
            name: "Sunset Waves Cardigan",
            price: 2499,
            image: "/images/sunset-waves-cardigan.jpg",
            length: "24 inches",
            width: "18 inches",
            fabric: "Acrylic Wool Blend",
            wash: "Gentle machine wash or hand wash",
            description: "Cozy and stylish cardigan for all seasons."
        },
        {
            id: 4,
            name: "Moonlight Granny Square Blanket",
            price: 3999,
            image: "/images/moonlight-granny-blanket.jpg",
            length: "60 inches",
            width: "50 inches",
            fabric: "Cotton & Acrylic Blend",
            wash: "Hand wash recommended",
            description: "Warm and handcrafted blanket with classic design."
        },
        {
            id: 5,
            name: "Buttercream Crop Top",
            price: 1499,
            image: "/images/buttercream-crop-top.jpg",
            length: "14 inches",
            width: "12 inches",
            fabric: "Soft Cotton Yarn",
            wash: "Hand wash only",
            description: "Elegant and breathable crochet crop top."
        },
        {
            id: 6,
            name: "Rosé Petal Scrunchie",
            price: 299,
            image: "/images/rose-petal-scrunchie.jpg",
            length: "3 inches",
            width: "3 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Cute handmade scrunchie for daily styling."
        },
        {
            id: 7,
            name: "Ocean Breeze Market Bag",
            price: 1199,
            image: "/images/ocean-breeze-market-bag.jpg",
            length: "14 inches",
            width: "12 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Eco-friendly market bag for shopping and daily use."
        },
        {
            id: 8,
            name: "Cinnamon Twist Headband",
            price: 399,
            image: "/images/cinnamon-twist-headband.jpg",
            length: "18 inches",
            width: "2 inches",
            fabric: "Acrylic Blend",
            wash: "Hand wash",
            description: "Cozy and stylish headband for winter wear."
        },
        {
            id: 9,
            name: "Blush Blossom Coaster Set",
            price: 699,
            image: "/images/blush-blossom-coaster-set.jpg",
            length: "4 inches",
            width: "4 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Set of handcrafted coasters for elegant table decor."
        },
        {
            id: 10,
            name: "Ivory Charm Phone Pouch",
            price: 799,
            image: "/images/ivory-charm-phone-pouch.jpg",
            length: "6 inches",
            width: "4 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Handmade pouch to carry your phone safely."
        },
        {
            id: 11,
            name: "Aurora Handmade Shawl",
            price: 1999,
            image: "/images/aurora-handmade-shawl.jpg",
            length: "60 inches",
            width: "28 inches",
            fabric: "Soft Acrylic Blend",
            wash: "Hand wash recommended",
            description: "Elegant shawl for a cozy and fashionable look."
        },
        {
            id: 12,
            name: "Vintage Rose Crochet Dress",
            price: 3499,
            image: "/images/vintage-rose-crochet-dress.jpg",
            length: "36 inches",
            width: "24 inches",
            fabric: "Cotton & Acrylic Blend",
            wash: "Hand wash only",
            description: "Beautiful handmade dress with vintage floral design."
        },
        {
            id: 13,
            name: "Cloud Knit Baby Booties",
            price: 599,
            image: "/images/cloud-knit-baby-booties.jpg",
            length: "4 inches",
            width: "2 inches",
            fabric: "Soft Cotton",
            wash: "Hand wash",
            description: "Gentle and cozy booties for babies."
        },
        {
            id: 14,
            name: "Meadow Bloom Table Runner",
            price: 1599,
            image: "/images/meadow-bloom-table-runner.jpg",
            length: "40 inches",
            width: "12 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Elegant table runner for home decor."
        },
        {
            id: 15,
            name: "Golden Hour Wrap Shrug",
            price: 1899,
            image: "/images/golden-hour-wrap-shrug.jpg",
            length: "28 inches",
            width: "20 inches",
            fabric: "Acrylic Blend",
            wash: "Hand wash recommended",
            description: "Stylish wrap shrug for a chic look."
        },
        {
            id: 16,
            name: "Sapphire Stitch Sling Bag",
            price: 1399,
            image: "/images/sapphire-stitch-sling-bag.jpg",
            length: "10 inches",
            width: "8 inches",
            fabric: "Cotton Yarn",
            wash: "Hand wash",
            description: "Trendy handmade sling bag for daily use."
        },
        {
            id: 17,
            name: "Rustic Heart Wall Hanging",
            price: 999,
            image: "/images/rustic-heart-wall-hanging.jpg",
            length: "12 inches",
            width: "10 inches",
            fabric: "Cotton Yarn",
            wash: "Dust with dry cloth",
            description: "Beautiful wall decor with rustic handmade charm."
        },
        {
            id: 18,
            name: "Pearl Knot Cushion Cover",
            price: 1299,
            image: "/images/pearl-knot-cushion-cover.jpg",
            length: "16 inches",
            width: "16 inches",
            fabric: "Cotton Blend",
            wash: "Hand wash",
            description: "Soft and elegant cushion cover for home decor."
        },
        {
            id: 19,
            name: "Midnight Mesh Summer Top",
            price: 1699,
            image: "/images/midnight-mesh-summer-top.jpg",
            length: "18 inches",
            width: "14 inches",
            fabric: "Lightweight Cotton",
            wash: "Hand wash",
            description: "Breathable and stylish summer top."
        },
        {
            id: 20,
            name: "Wildflower Crochet Scarf",
            price: 899,
            image: "/images/wildflower-crochet-scarf.jpg",
            length: "48 inches",
            width: "6 inches",
            fabric: "Soft Acrylic",
            wash: "Hand wash recommended",
            description: "Handmade scarf with floral crochet pattern."
        }
    ];

    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <h2>Product not found</h2>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${quantity} item(s) added to cart!`);
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>

                {/* IMAGE CONTAINER WITH QUANTITY CORNER */}
                <div style={imageContainer}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={imageStyle}
                    />

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
                    Add to Cart
                </button>

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

export default ProductDetails;