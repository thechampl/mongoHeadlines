// Setup Controller
const express = require("express");
const router = express.Router();

// GET - Registration Form
router.get("/", (req,res) => res.render('index'));

router.get("/favorites", (req,res)=> res.render('favorites'))


// Export Router
module.exports = router;