import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <div style={cardStyle}>

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
    transition: "0.3s ease"
};

const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px"
};

const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#ff4f81",
    color: "white",
    cursor: "pointer"
};




const viewBtnHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(255, 79, 129, 0.5)",
};





export default ProductCard;