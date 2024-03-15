const asyncHandler = require("express-async-handler");

const Team = require("../models/teamModel");
const User = require("../models/userModel");

const getTeams = asyncHandler(async (req, res) => {
  const team = await Team.find({ user: req.user.id });
  res.status(200).json(team);
});
const newTeam = asyncHandler(async (req, res) => {
  const { name, teamSize } = req.body;
  if (!name || !teamSize) {
    res.status(400);
    throw new Error("Please add a team fields");
  }
  const team = await Team.create({
    user: req.user.id,
    name: req.body.name,
    teamSize: req.body.teamSize,
  });
  res.status(200).json({ name: team.name, teamSize: team.teamSize });
});

const updateTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(400);
    throw new Error("Team not found!");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure the logged is user matches the team user
  if (team.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const updatedTeam = await Team.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      teamSize: req.body.teamSize,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedTeam);
});

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    res.status(400);
    throw new Error("Team not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure the logged is user matches the team user
  if (team.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  // using deleteOne function And getting the id From the shema table directly _id.
  await Team.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTeams,
  newTeam,
  updateTeam,
  deleteTeam,
};
