import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customize() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const referenceImages = [
        "/images/lavender-bloom-tote.jpg",
        "/images/daisy-whisper-bucket-hat.jpg",
        "/images/sunset-waves-cardigan.jpg",
        "/images/moonlight-granny-blanket.jpg",
        "/images/buttercream-crop-top.jpg",
        "/images/rose-petal-scrunchie.jpg",
        "/images/ocean-breeze-market-bag.jpg",
        "/images/cinnamon-twist-headband.jpg",
        "/images/blush-blossom-coaster-set.jpg",
        "/images/ivory-charm-phone-pouch.jpg"
    ];

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddToCart = () => {
        alert("Customization added to cart!");
    };

    const imagesToShow = showAll ? referenceImages : referenceImages.slice(0, 6);

    return (
        <div style={container}>

            <button style={backButton} onClick={() => navigate(-1)}>
                ← Back
            </button>

            <h2 style={title}>Customize Your Own Product ✨</h2>
            <p style={subtitle}>
                Personalize colors, size, and design. Upload reference image if you want.
            </p>

            {/* Reference Images Box */}
            <div style={box}>
                <h3>Reference Ideas</h3>

                <div style={imageGrid}>
                    {imagesToShow.map((img, index) => {
                        const isSelected = selectedImage === img;

                        return (
                            <div
                                key={index}
                                style={{
                                    ...imageCard,
                                    border: isSelected ? "2px solid #ff4f81" : "2px solid transparent",
                                    boxShadow: isSelected
                                        ? "0 0 12px rgba(255,79,129,0.4)"
                                        : "0 5px 15px rgba(0,0,0,0.05)"
                                }}
                            >
                                <img
                                    src={img}
                                    style={imgStyle}
                                    onClick={() => setPreview(img)}
                                />

                                {isSelected && (
                                    <span style={selectedBadge}>✔</span>
                                )}

                                <button
                                    style={useBtn}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    Use This
                                </button>
                            </div>
                        );
                    })}
                </div>

                {!showAll && referenceImages.length > 6 && (
                    <button
                        style={viewMoreBtn}
                        onClick={() => setShowAll(true)}
                    >
                        View More +
                    </button>
                )}

                {selectedImage && (
                    <p style={{ marginTop: "10px" }}>
                        Selected Reference: <strong>✔</strong>
                    </p>
                )}
            </div>

            {/* Upload Box */}
            <div style={box}>
                <h3>Upload Your Picture</h3>
                <input type="file" onChange={handleFile} />
                {file && <p>Selected: {file.name}</p>}
            </div>

            {/* Add to Cart */}
            <button style={addBtn} onClick={handleAddToCart}>
                Add to Cart 🛒
            </button>
            {preview && (
                <div style={previewOverlay} onClick={() => setPreview(null)}>
                    <div style={previewBox}>
                        <img src={preview} style={previewImg} />
                        <p>Click outside to close</p>
                    </div>
                </div>
            )}
        </div>

    );
}

/* Styles */

const container = {
    padding: "40px",
    textAlign: "center",
};

const title = {
    fontSize: "28px",
    marginBottom: "10px",
};

const subtitle = {
    color: "#555",
    marginBottom: "30px",
};

const box = {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    marginBottom: "25px",
};

const imageGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginTop: "10px",
};

const imageCard = {
    position: "relative",
    textAlign: "center",
    background: "#fdf6f9",
    padding: "10px",
    borderRadius: "12px"
};

const imgStyle = {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
};

const useBtn = {
    marginTop: "8px",
    padding: "6px 14px",
    borderRadius: "18px",
    border: "none",
    background: "#ff4f81",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
};

const viewMoreBtn = {
    marginTop: "15px",
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    background: "#ff7aa8",
    color: "white",
    cursor: "pointer",
};

const addBtn = {
    padding: "12px 25px",
    background: "#ff4f81",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
};

const backButton = {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "20px",
};
const selectedBadge = {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "#ff4f81",
    color: "white",
    fontSize: "10px",
    padding: "3px 6px",
    borderRadius: "10px"
};
const previewOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const previewBox = {
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center"
};

const previewImg = {
  maxWidth: "400px",
  maxHeight: "400px",
  borderRadius: "10px"
};
export default Customize;