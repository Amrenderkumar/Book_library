import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../utils/collectionSlice";
import booksReducer from "../utils/booksSlice"; // ✅ Correct name, correct casing

const store = configureStore({
  reducer: {
    collections: collectionReducer,
    books: booksReducer,
  },
});

export default store;
