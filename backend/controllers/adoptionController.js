const Pets = require("../models/Pet");
const Adoption = require("../models/Adoption");
const User = require("../models/User");

const applyAdoption = async (req, res) => {
  try {
    const petId = req.params.petId;
    const userId = req.user.id;
    const pet = await Pets.findById(petId);
    if (!pet || pet.status === "adopted") {
      res.status(400).json({ message: "Pet not available" });
    }
    const alreadyAdopted = await Adoption.findOne({ user: userId, pet: petId });
    if (alreadyAdopted) {
      res.status(404).json({ message: "Pet already adopted" });
    }
    const adoption = await Adoption.create({
      user: userId,
      pet: petId,
    });
    res.json({ message: "Pet applied successfully", adoption });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const myApplication = async (req, res) => {
  const userId = req.user.id;
  const myAdoption = await Adoption.find({ user: userId }).populate([
    "user",
    "pet",
  ]);
  res.json({ data: myAdoption });
};

const overallApplication = async (req, res) => {
  const overallAdoption = await Adoption.find().populate(["user", "pet"]);
  res.json({ data: overallAdoption });
};

const updateAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.id;
    const { status } = req.body;
    const adoptionData = await Adoption.findById(adoptionId).populate(["pet"]);
    if (adoptionData.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }
    adoptionData.status = status;
    await adoptionData.save();

    if (status === "approved") {
      adoptionData.pet.status = "adopted";
      await adoptionData.pet.save();
    }
    res.json({ message: "Status Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  applyAdoption,
  myApplication,
  overallApplication,
  updateAdoption,
};
