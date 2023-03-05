import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { profile } from "./userSlice";

interface InitialState {
  photos: object[];
  photo: object;
  error: boolean;
  success: boolean;
  loading: boolean;
  message: string;
}

const initialState: InitialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: "",
};

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo: any, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id);

    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData: any, thunkAPI: any) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getPhoto = createAsyncThunk("photo/getphoto", async (id: string) => {
  const data = await photoService.getPhoto(id);

  return data;
});

export const like = createAsyncThunk("photo/like", async (id: string, thunkAPI: any) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.likePhoto(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

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
      .addCase(publishPhoto.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.photo = {};
        state.message = action.payload;
      })
      .addCase(publishPhoto.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "photo published successfully";
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deletePhoto.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.photo = {};
        state.message = action.payload;
      })
      .addCase(deletePhoto.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        state.photos = state.photos.filter((photo: any) => {
          return photo._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photos = action.payload;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updatePhoto.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.success = false;

        state.photo = {};

        state.message = action.payload;
      })
      .addCase(updatePhoto.fulfilled, (state, action: any) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        state.photos.map((photo: any) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.photo = {};
      })
      .addCase(getPhoto.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
      })
      .addCase(like.fulfilled, (state : any, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo : any) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action : any) => {
        state.loading = false;
        state.success = false;
        state.message = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
