const Pets = require("../models/Pet");
const Adoption = require("../models/Adoption");

const getPets = async (req, res) => {
  try {
    const {
      search,
      breed,
      species,
      age,
      status,
      userId,
      page = 1,
      limit = 5,
    } = req.query;

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
    if (status) {
      query.status = status;
    }

    if (userId) {
      const applied = await Adoption.find({ user: userId }).select("pet");

      const appliedPetIds = applied.map((a) => a.pet);

      query._id = { $nin: appliedPetIds };
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
    const imageUrl = req.file.path;
    const { name, breed, species, age } = req.body;
    if (!name || !breed || !species || !age || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const pet = await Pets.create({
      name,
      breed,
      species,
      age,
      image: imageUrl,
    });
    res.json({ message: "Pet created", data: pet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePet = async (req, res) => {
  const imageUrl = req.file.path;
  const { name, breed, species, age } = req.body;
  const pet = await Pets.findByIdAndUpdate(
    req.params.id,
    { name, breed, species, age, image: imageUrl },
    { returnDocument: "after" },
  );
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
