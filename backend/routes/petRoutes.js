const express = require("express");
const {
  getPets,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} = require("../controllers/petController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//Global accessable
router.get("/", getPets);
router.get("/:id", getPetById);

//Admin Access
router.post("/", protect, isAdmin, addPet);
router.put("/:id", protect, isAdmin, updatePet);
router.delete("/:id", protect, isAdmin, deletePet);

module.exports = router;
