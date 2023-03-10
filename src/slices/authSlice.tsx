import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: user != "null" ? user : null,
  error: false,
  success: false,
  loading: false,
  status: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async(user: any, thunkAPI) => {
    const data = await authService.login(user)

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = false
        state.success = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.user = null;
        state.status = String(action.payload);
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.user = null;
        state.status = String(action.payload)
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
