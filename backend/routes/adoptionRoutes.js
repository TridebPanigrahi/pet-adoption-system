const express = require("express");
const {
  applyAdoption,
  myApplication,
  overallApplication,
  updateAdoption,
} = require("../controllers/adoptionController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.router();

//for users
router.post("/apply/:petId", protect, applyAdoption);
router.get("/my", protect, myApplication);

//for Admin
router.get("/all", protect, isAdmin, overallApplication);
router.put("/:id", protect, isAdmin, updateAdoption);

module.exports = router;
