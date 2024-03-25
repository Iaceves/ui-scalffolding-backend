import axios from "axios";

const API_URL = "http://localhost:8000";

//Create new Team
const createTeam = async (teamData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL + "/api/teams", teamData, config);
  return res.data;
};

//Get user Teams
const getTeams = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + "/api/teams/", config);
  return res.data;
};

//Delete user Team
const deleteTeam = async (teamId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + "/api/teams/" + teamId, config);
  return res.data;
};

const teamService = {
  createTeam,
  getTeams,
  deleteTeam,
};

export default teamService;
