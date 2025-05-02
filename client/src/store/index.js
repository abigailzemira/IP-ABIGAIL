import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
// import { movieReducer, inc as movieInc, dec, incBy } from "./movieSlice.js";

export const store = configureStore({
  reducer: {
    books: bookReducer
    // movies: moviesReducer,
    // genres: genresReducer,
    // users: usersReducer
  }
})