import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { profile } from "./userSlice";

const initialState = {
    photos: [{}],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: "",
};

export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo : any, thunkAPI: any) => {
      const token = thunkAPI.getState().auth.user.token;
  
      const data = await photoService.publishPhoto(photo, token);
      
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
      }
  
      return data;
    }
  );


export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state: any) => {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.success = false;
        })
        .addCase(publishPhoto.rejected, (state, action : any) => {
            state.loading = false;
            state.error = true;
            state.success = false;
            state.photo = {};
            state.message = action.payload;
        })
        .addCase(publishPhoto.fulfilled, (state, action : any) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.photo = action.payload;
            state.photos.unshift(state.photo);
            state.message = "photo published successfully"
        })
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer