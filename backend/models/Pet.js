const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: String,
    species: String,
    breed: String,
    age: Number,
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("pets", PetSchema);
