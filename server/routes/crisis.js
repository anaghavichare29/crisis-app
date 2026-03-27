const express = require("express");
const router = express.Router();

router.get("/nearby", (req, res) => {
  const sampleData = [
    {
      title: "Fire Accident",
      description: "Fire broke out in building",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      location: { lat: 19.076, lng: 72.8777 }
    },
    {
      title: "Flood Alert",
      description: "Heavy flooding reported",
      image: "https://images.unsplash.com/photo-1600379678777-98a5c4f3a5c2",
      location: { lat: 19.078, lng: 72.879 }
    }
  ];

  res.json(sampleData);
});

module.exports = router;