import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Async thunk to fetch zip code from FastAPI
export const fetchZipCode = createAsyncThunk(
  'location/fetchZipCode',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/coordinates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch zip code');
      }

      const data = await response.json();
      const zipCode = data.zip_code; // Assuming API returns { zip_code: "12345" }
      // Store zip code in cookies (expires in 7 days)
      Cookies.set('user_zipcode', zipCode, { expires: 7 });
      return zipCode;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  location: { lat: null, lon: null },
  zipCode: null,
  error: null,
  loading: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
      state.error = null;
    },
    setZipCode(state, action) {
      state.zipCode = action.payload;
      state.error = null;
    },
    setLocationError(state, action) {
      state.error = action.payload;
      state.location = { lat: null, lon: null };
      state.zipCode = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZipCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZipCode.fulfilled, (state, action) => {
        state.loading = false;
        state.zipCode = action.payload;
        state.error = null;
      })
      .addCase(fetchZipCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.zipCode = null;
      });
  },
});

export const { setLocation, setZipCode, setLocationError } = locationSlice.actions;
export default locationSlice.reducer;