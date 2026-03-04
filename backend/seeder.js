const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const products = [
  {
    name: "Lavender Bloom Tote",
    price: 1299,
    image: "/images/lavender-bloom-tote.jpg",
    description: "Handmade crochet tote bag",
    length: "12 inches",
    width: "10 inches",
    fabric: "100% Cotton Yarn",
    wash: "Hand wash with mild detergent"
  },
  {
    name: "Daisy Whisper Bucket Hat",
    price: 899,
    image: "/images/daisy-whisper-bucket-hat.jpg",
    description: "Soft crochet bucket hat",
    length: "9 inches",
    width: "8 inches",
    fabric: "Cotton Blend",
    wash: "Hand wash, air dry"
  },

  {
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
    name: "Wildflower Crochet Scarf",
    price: 899,
    image: "/images/wildflower-crochet-scarf.jpg",
    length: "48 inches",
    width: "6 inches",
    fabric: "Soft Acrylic",
    wash: "Hand wash recommended",
    description: "Handmade scarf with floral crochet pattern."
  },
];
const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ All 20 Products Imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();