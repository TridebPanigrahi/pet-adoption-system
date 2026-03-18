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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("pets", PetSchema);
