const express = require("express");
const {
  applyAdoption,
  myApplication,
  overallApplication,
  updateAdoption,
  withdralApplication,
} = require("../controllers/adoptionController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//for users
router.post("/apply/:petId", protect, applyAdoption);
router.get("/my", protect, myApplication);
router.delete('/:id', protect, withdralApplication)

//for Admin
router.get("/all", protect, isAdmin, overallApplication);
router.put("/:id", protect, isAdmin, updateAdoption);

module.exports = router;
