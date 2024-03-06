const express = require("express");
const router = express.Router();

const {
  getUsers,
  newUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", newUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
