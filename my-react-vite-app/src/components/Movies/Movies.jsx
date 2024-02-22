// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  // Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";

const Movies = () => {
  const { data, error , isFetching } = useGetMoviesQuery();

  console.log(data);
  // handle fetching else the movies will be undefined 
  if(isFetching){
    return (
      // box = div
      <Box display="flex" justifyContent='center'>
        <CircularProgress  size="4rem"/>
      </Box>
    )
  }

  // if the data is not available
  if(!data.results.length){
    return(
      <Box display='flex' justifyContent='center' mt='20px'>
        <Typography variant="h4">
        No Movies that Match That Name...
          <br />
          Please Search For Somthing else...
        </Typography>
      </Box>
    )
  }

  // if theere is n error
  if (error) return "An Error Has Occured...";

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
