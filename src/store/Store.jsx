import { configureStore } from "@reduxjs/toolkit";
import tvReducer from "./reducers/TvSlice";
import movieReducer from "./reducers/MovieSlice";
import PersonReducer from "./reducers/PersonSlice";

export const store = configureStore({
  reducer: {
    Movie: movieReducer,
    Tv: tvReducer,
    Person: PersonReducer,
  },
});
