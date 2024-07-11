const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
