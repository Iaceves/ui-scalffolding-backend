import axios from "axios";

const API_URL = "http://localhost:8000";

//Register user
const register = async (userData) => {
  const res = await axios.post(API_URL + "/api/users/", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//Login user
const login = async (userData) => {
  console.log("userData: ", userData);
  const res = await axios.post(API_URL + "/api/users/login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
