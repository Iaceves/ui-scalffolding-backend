const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

const newUser = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const user = await User.create({
    name: req.body.name,
  });
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  console.log("User found:", user);
  // using deleteOne function And getting the id From the shema table directly _id.
  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  newUser,
  updateUser,
  deleteUser,
};
