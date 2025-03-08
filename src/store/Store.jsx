import { configureStore } from '@reduxjs/toolkit'
import  movieReducer  from './reducers/MovieSlice'
import  PersonReducer  from './reducers/PersonSlice'
import TvReducer  from './reducers/Tvslice'

export const store = configureStore({
  reducer: {
    Movie:movieReducer,
    Tv:TvReducer,
    Person:PersonReducer
  },
})