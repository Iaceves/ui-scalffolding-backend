const express = require("express");
const router = express.Router();

const {
  getTeams,
  newTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getTeams);
router.post("/", protect, newTeam);
router.put("/:id", protect, updateTeam);
router.delete("/:id", protect, deleteTeam);

module.exports = router;
