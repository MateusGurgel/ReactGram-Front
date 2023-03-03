import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService"

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: "",
  };

  export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI : any) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user, token)

        return data
    }
  )

  export const updateProfile = createAsyncThunk(
    "user/update",
    async(user : any, thunkAPI: any) => {
      const token = thunkAPI.getState().auth.user.token

      const data = await userService.updateProfile(user, token)

      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0])
      }

      return data;
    }
  )

  export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id: any, thunkAPI: any) => {
      const token = thunkAPI.getState().auth.user.token;
  
      const data = await userService.getUserDetails(id);
  
      console.log(data);
  
      return data;
    }
  );

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      resetMessage: (state) => {
        state.message = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true
            state.error = false
            state.success = false 
          })
          .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
          })
          .addCase(updateProfile.pending, (state) => {
          state.loading = true
            state.error = false
            state.success = false
          })
          .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload
            state.message = "User successfully updated"
          })
          .addCase(updateProfile.rejected, (state, action : any) => {
            state.error = true;
            state.loading = false;
            state.success = false;
            state.user = {};
            state.message = action.payload;
          })
          .addCase(getUserDetails.pending, (state) => {
            state.loading = true
            state.error = false
          })
          .addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.user = action.payload;
          })
    }
  });

  export const { resetMessage } = userSlice.actions;
  export default userSlice.reducer;