import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
  };

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      resetMessage: (state) => {
        state.message = null;
      },
    },
  });

  export default userSlice.reducer;