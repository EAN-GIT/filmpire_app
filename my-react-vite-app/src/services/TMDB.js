// all the call to the TMDB api will be done here
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import.meta.env.REACT_APP_TMDB_KEY;
const tmdbApiKey = "d1df4024678d5579405a85ef7d474ae7";
console.log({ tmdbApiKey });
const page = 1;

//   /*Get Movie*/
//   getMovie: builder.query({
//     query: (id) =>
//       `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
//   }),

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // builder allows us to build a specific request
    // GetMovies by [type]
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

//redux automatically creates hooks for each query
export const { useGetMoviesQuery } = tmdbApi;
