const mongoose = require("mongoose");

const CrisisSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Crisis", CrisisSchema);