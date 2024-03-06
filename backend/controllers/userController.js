const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Users" });
});

const newUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "New User" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update User ${req.params.id}` });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete User ${req.params.id}` });
});

module.exports = {
  getUsers,
  newUser,
  updateUser,
  deleteUser,
};
