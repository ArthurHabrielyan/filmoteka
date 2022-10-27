import { onPopularMovies, genreList, onMovieSearch } from "./movies-operations";
import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../services/LocalStorageService";
const initialState = {
  movies: [],
  genreList: [],
  watched:
    JSON.parse(localStorage.getItem("watched")) !== null
      ? JSON.parse(localStorage.getItem("watched"))
      : [],
  queue:
    JSON.parse(localStorage.getItem("queue")) !== null
      ? JSON.parse(localStorage.getItem("queue"))
      : [],
  message: "",
};

const localStorageService = new LocalStorageService();

export const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToWatched: (state, { payload }) => {
      if (payload) {
        state.watched.push(payload);
        localStorageService.addMovie(payload, "watched");
      }
    },
    addToQueue: (state, { payload }) => {
      if (payload) {
        state.queue.push(payload);
        localStorageService.addMovie(payload, "queue");
      }
    },
    deleteFromWatched: (state, { payload }) => {
      state.watched = state.watched.filter((film) => film.id !== payload.id);
      localStorageService.deleteMovie(payload, "watched");
    },
    deleteFromQueue: (state, { payload }) => {
      state.queue = state.queue.filter((film) => film.id !== payload.id);
      localStorageService.deleteMovie(payload, "queue");
    },
  },
  extraReducers: {
    [onPopularMovies.fulfilled](state, { payload }) {
      state.movies = payload.results;
    },
    [onMovieSearch.fulfilled](state, { payload }) {
      state.movies = payload.results;
    },
    [onMovieSearch.rejected](state, { payload }) {
      console.log(payload);
    },
    [genreList.fulfilled](state, { payload }) {
      state.genreList = payload;
    },
  },
});

export const movieActions = moviesReducer.actions;

export default moviesReducer.reducer;
