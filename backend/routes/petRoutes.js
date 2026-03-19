const express = require("express");
const {
  getPets,
  getPetById,
  addPet,
  updatePet,
  deletePet,
} = require("../controllers/petController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

//Global accessable
router.get("/", getPets);
router.get("/:id", getPetById);

//Admin Access
router.post("/", protect, isAdmin, upload.single("image"), addPet);
router.put("/:id", protect, isAdmin, upload.single("image"), updatePet);
router.delete("/:id", protect, isAdmin, deletePet);

module.exports = router;
