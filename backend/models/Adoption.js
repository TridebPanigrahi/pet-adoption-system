const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "pets" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("adoption", AdoptionSchema);
