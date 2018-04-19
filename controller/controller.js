// Setup Controller
const express = require("express");
const router = express.Router();

// GET - Registration Form
router.get("/", (req,res) => res.render('index'));



// Export Router
module.exports = router;