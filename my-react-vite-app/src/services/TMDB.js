// all the call to the TMDB api will be done here
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import.meta.env.REACT_APP_TMDB_KEY;
const tmdbApiKey = 'd1df4024678d5579405a85ef7d474ae7';
console.log({ tmdbApiKey });

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // builder allows us to build a specific request
    //* Get Genres
    getGenre: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),
    // GetMovies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* get movies by serach
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get movies by categories

        console.log({ genreIdOrCategoryName, page });
        console.log('here');

        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          console.log('string');
          return `movie/${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          console.log('number');

          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // default==ge popular movies if nor category/grnre was selected
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      }
    }),
    //* Get Movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    })
  })
});

//redux automatically creates hooks for each query
export const { useGetMoviesQuery, useGetGenreQuery, useGetMovieQuery } =
  tmdbApi;
