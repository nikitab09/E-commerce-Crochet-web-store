function Footer() {
  return (
    <footer style={footerStyle}>
      <div>
        <h3>Crochet Store 🧶</h3>
        <p>Handmade with love & creativity.</p>
      </div>
      <p>© 2026 Crochet Store. All rights reserved.</p>
    </footer>
  );
}

const footerStyle = {
  background: "#fff",
  padding: "40px",
  marginTop: "40px",
  textAlign: "center",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
};

export default Footer;