import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchImagesQuery, Image } from '../../api';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
type Error = string | null;

export interface ImagesState {
  images: Image[];
  status: Status;
  error: Error;
}

const initialState: ImagesState = {
  images: [],
  status: 'idle',
  error: null
};

export const fetchImages = createAsyncThunk('fetchImages', async () => {
  const response = await fetchImagesQuery();
  return response;
});

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    toggleFavorited: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const images = [...state.images];
      const image = images.find((i) => i.id === action.payload.id);
      if (image) {
        image.favorited = !image.favorited;
        image.updatedAt = action.payload.date;
      }
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((image) => image.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
        );
        state.status = 'succeeded';
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  }
});

export const { toggleFavorited, deleteImage } = imagesSlice.actions;

export default imagesSlice.reducer;
