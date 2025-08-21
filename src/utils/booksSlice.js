import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch books from API
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://potterapi-fedeperin.vercel.app/en/books"
  );
  return response.data;
});

// Create slice
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add a new book
    addBook: (state, action) => {
      const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150x200?text=No+Cover";

      // Set default image if not provided
      const bookWithImage = {
        ...action.payload,
        imageUrl: action.payload.imageUrl || DEFAULT_IMAGE_URL,
      };

      state.books.push(bookWithImage);

      // Save only custom books in localStorage
      const customBooks = state.books.filter((book) => book.isCustom);
      localStorage.setItem("customBooks", JSON.stringify(customBooks));
    },

    // Delete a custom-added book
    deleteCustomBook: (state, action) => {
      const idToDelete = action.payload;

      // Remove from books array
      state.books = state.books.filter(
        (book) => !(book.isCustom && book.id === idToDelete)
      );

      // Update localStorage
      const customBooks = state.books.filter((book) => book.isCustom);
      localStorage.setItem("customBooks", JSON.stringify(customBooks));
    },
  },

  // Handle async thunk states
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;

        // Load custom books from localStorage and merge
        const customBooks =
          JSON.parse(localStorage.getItem("customBooks")) || [];
        state.books = [...state.books, ...customBooks];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { addBook, deleteCustomBook } = booksSlice.actions;
export default booksSlice.reducer;
