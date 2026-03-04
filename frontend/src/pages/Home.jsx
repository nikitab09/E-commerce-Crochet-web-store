import ProductCard from "../components/ProductCard";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Home({ search }) {
    const navigate = useNavigate();
    const productRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(15);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log("Error fetching products:", err);
            });
    }, []);

    const scrollToProducts = () => {
        productRef.current.scrollIntoView({ behavior: "smooth" });
    };


    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>

            {/* HERO SECTION */}
            <section className="hero-section">

                <div >
                    <h1 style={heroTitle}>Handmade Luxury Crochet ✨</h1>
                    <p style={heroText}>
                        Crafted with elegance, softness & love.
                    </p>
                    <button style={heroButton} onClick={scrollToProducts}>
                        Explore Collection
                    </button>
                </div>
            </section>

            {/* FEATURE SECTION */}
            <section style={featureSection}>
                <h2 style={sectionTitle}>Why Choose Us</h2>

                <div style={featureGrid}>
                    <div style={featureCard}>
                        <h3>Premium Yarn</h3>
                        <p>Soft, durable and skin-friendly materials.</p>
                    </div>

                    <div style={featureCard}>
                        <h3>Handcrafted</h3>
                        <p>Each product is made with precision & care.</p>
                    </div>

                    <div style={featureCard}>
                        <h3>Elegant Designs</h3>
                        <p>Modern yet aesthetic crochet fashion.</p>
                    </div>
                    <div style={featureCard}>
                        <h3>Customizable</h3>
                        <p>Personalized colors, sizes & designs crafted just for you.</p>
                    </div>
                </div>
            </section>

            {/* PRODUCT SECTION */}
            <section id="products" ref={productRef} style={productSection}>
                <div style={customizeBox}>
                    <h3 style={customizeTitle}>Customize Your Own Crochet Piece ✨</h3>
                    <p style={customizeText}>
                        Choose your colors, size & design. We’ll craft it specially for you.
                    </p>
                    <button
                        className="customize-btn"
                        onClick={() => navigate("/customize")}
                    >
                        Customize
                    </button>
                </div>
                <h2 style={sectionTitle}>Featured Collection</h2>

                {/* SEARCH BAR */}
                <div style={searchContainer}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={searchInput}
                    />
                </div>

                <div style={productGrid}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts
                            .slice(0, visibleCount)
                            .map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                    ) : (
                        <p>No products found 😔</p>
                    )}
                </div>
                {visibleCount < filteredProducts.length && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <button
                            style={viewMoreButton}
                            onClick={() => setVisibleCount(filteredProducts.length)}
                        >
                            View More +
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
}

/* ---------- STYLES ---------- */

const searchContainer = {
    textAlign: "center",
    marginBottom: "30px"
};

const searchInput = {
    padding: "12px",
    width: "300px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    outline: "none"
};

const heroStyle = {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",

};

const heroTitle = {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#ffffff",
    textShadow: "0 6px 30px rgba(0, 0, 0, 0.99)",
    letterSpacing: "1px"
};

const heroText = {
    fontSize: "18px",
    marginBottom: "30px",
    color: "white"
};

const heroButton = {
    padding: "12px 30px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(90deg, #ff4f81, #ff7aa8)",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    animation: "pulse 2s infinite",
    boxShadow: "0 0 10px rgba(255,79,129,0.4)"
};


const featureSection = {
    padding: "80px 60px",
    backgroundColor: "#fff"
};

const sectionTitle = {
    textAlign: "center",
    marginBottom: "50px",
    fontSize: "30px"
};

const featureGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px"
};

const featureCard = {
    background: "#fdf6f9",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center"
};

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

const customizeBox = {
    background: "white",
    padding: "40px",
    borderRadius: "25px",
    textAlign: "center",
    marginBottom: "60px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const customizeTitle = {
    fontSize: "26px",
    marginBottom: "15px"
};

const customizeText = {
    marginBottom: "25px",
    color: "#555"
};



const viewMoreButton = {
    padding: "12px 30px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(90deg, #ff4f81, #ff7aa8)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.3s ease"
};



export default Home;