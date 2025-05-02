import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/ownedBooks",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBookStatus = createAsyncThunk(
  "books/updateStatus",
  async ({ id, status }, { dispatch }) => {
    await axios({
      method: "PUT", 
      url: `http://localhost:3000/ownedBooks/${id}`,
      data: { status },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"), 
      }
    });
    dispatch(fetchBooks());
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook", 
  async (id, { dispatch }) => {
    await axios({
      method: "DELETE",
      url: `http://localhost:3000/ownedBooks/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      }
    });
    dispatch(fetchBooks());
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  }
});

export const bookReducer = bookSlice.reducer;

