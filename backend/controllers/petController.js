const Pets = require("../models/Pet");

const getPets = async (req, res) => {
  try {
    const { search, breed, species, age, page = 1, limit = 5 } = req.query;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (breed) {
      query.breed = breed;
    }
    if (species) {
      query.species = species;
    }
    if (age) {
      query.age = age;
    }

    const pets = await Pets.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Pets.countDocuments(query);

    res
      .status(200)
      .json({ total, page, pages: Math.ceil(total / limit), data: pets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPetById = async (req, res) => {
  const pet = await Pets.findById(req.params.id);
  res.json({ data: pet });
};

const addPet = async (req, res) => {
  try {
    const { name, breed, species, age } = req.body;
    if (!name || !breed || !species || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const pet = await Pets.create(req.body);
    res.json({ message: "Pet created", data: pet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
