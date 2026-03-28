const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ✅ GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD contact
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 DEBUG

    const contact = new Contact(req.body);
    await contact.save();

    console.log("SAVED TO DB:", contact); // 👈 DEBUG

    res.json(contact);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE contact
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;