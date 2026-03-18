const Pets = require("../models/Pet");

const getPets = async (req, res) => {
  const pets = await Pets.find();
  res.status(200).json({ data: pets });
};

const getPetById = async (req, res) => {
  const pet = await Pets.findById(req.params.id);
  res.json({ data: pet });
};

const addPet = async (req, res) => {
  const pet = await Pets.create(req.body);
  res.json({ message: "Pet created", data: pet });
};

const updatePet = async (req, res) => {
  const pet = await Pets.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "Pet Updated", data: pet });
};

const deletePet = async (req, res) => {
  await Pets.findByIdAndDelete(req.params.id);
  res.json({ message: "Pet deleted" });
};

module.exports = {
  getPets,
  getPetById,
  addPet,
  updatePet,
  deletePet,
};
