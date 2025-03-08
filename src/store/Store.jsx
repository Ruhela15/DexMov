import { configureStore } from "@reduxjs/toolkit";
import TvReducer from './reducers/TvSlice';
import movieReducer from "./reducers/MovieSlice";
import PersonReducer from "./reducers/PersonSlice";

export const store = configureStore({
  reducer: {
    Movie: movieReducer,
    Tv: TvReducer,
    Person: PersonReducer,
  },
});
