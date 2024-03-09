const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name value"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
