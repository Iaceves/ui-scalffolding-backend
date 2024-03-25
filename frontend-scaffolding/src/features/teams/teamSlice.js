import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "./teamService";

const initialState = {
  teams: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new Team
export const createTeam = createAsyncThunk(
  "team/create",
  async (teamData, thunkAPI) => {
    try {
      console.log("inside of creating a team:", teamData);
      const token = thunkAPI.getState().auth.user.token;
      return await teamService.createTeam(teamData, token);
    } catch (error) {
      console.log("error:", error);
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get User teams
export const getTeams = createAsyncThunk(
  "teams/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await teamService.getTeams(token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete team
export const deleteTeam = createAsyncThunk(
  "teams/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await teamService.deleteTeam(id, token);
    } catch (error) {
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = state.teams.filter(
          (team) => team._id !== action.payload.id
        );
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = teamSlice.actions;
export default teamSlice.reducer;
