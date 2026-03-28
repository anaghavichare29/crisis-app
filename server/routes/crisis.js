const express = require("express");
const router = express.Router();

router.get("/nearby", (req, res) => {
  const sampleData = [
    {
      id: 1,
      title: "Major Fire Hazard",
      description: "Fire broke out in a commercial building in Andheri East.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
      location: { lat: 19.1136, lng: 72.8697 } // Andheri
    },
    {
      id: 2,
      title: "Severe Waterlogging",
      description: "Heavy flooding reported near Hindmata, Dadar. Traffic diverted.",
      image: "https://images.unsplash.com/photo-1600379678777-98a5c4f3a5c2",
      location: { lat: 19.0166, lng: 72.8402 } // Dadar
    },
    {
      id: 3,
      title: "Traffic Accident",
      description: "Multi-vehicle collision on the Bandra-Worli Sea Link.",
      image: "https://images.unsplash.com/photo-1562184552-997c461abbe6",
      location: { lat: 19.0356, lng: 72.8164 } // Bandra  
    },
    {
      id: 4,
      title: "Building Collapse Risk",
      description: "Old residential structure reported unstable in Dongri.",
      image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637",
      location: { lat: 18.9610, lng: 72.8360 } // Dongri / South Mumbai
    },
    {
      id: 5,
      title: "Power Outage",
      description: "Widespread power cut affecting hospitals in Powai area.",
      image: "https://images.unsplash.com/photo-1493118944733-149d6c46644d",
      location: { lat: 19.1197, lng: 72.9051 } // Powai
    }
  ];

  res.json(sampleData);
});

module.exports = router;