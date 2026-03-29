const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const crisisRoutes = require("./routes/crisis");
const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());
console.log("Connecting to MongoDB...");
// ✅ CONNECT TO MONGODB (PUT YOUR URL)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ ROUTES
app.use("/api/crisis", crisisRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));