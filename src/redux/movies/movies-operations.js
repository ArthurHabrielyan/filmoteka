import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "40435ef3acb8f6da32bfa6c21057cf43";

export const onPopularMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page = 1, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/trending/all/day?api_key=${API_KEY}&page=${page}`
      );
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const onMovieSearch = createAsyncThunk(
  "movies/searchMovies",
  async ({ currentPage, searchValue }, { rejectWithValue }) => {
    try {
      console.log(searchValue);
      const { data } = await axios.get(
        `/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${currentPage}&include_adult=false`
      );

      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const genreList = createAsyncThunk(
  "movies/genres",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);

      return data.genres;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
