// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery
  // Pagination,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const lg = useMediaQuery((theme)=> theme.breakpoints.only('lg'))

  const numberOfMovies = lg ? 17 : 19
  //
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery
  });

  console.log(data);
  // handle fetching else the movies will be undefined
  if (isFetching) {
    return (
      // box = div
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    );
  }

  // if the data is not available
  if (!data?.results?.length) {
    return (
      <Box display='flex' justifyContent='center' mt='20px'>
        <Typography variant='h4'>
          No Movies that Match That Name...
          <br />
          Please Search For Somthing else...
        </Typography>
      </Box>
    );
  }

  // if theere is n error
  if (error) return 'An Error Has Occured...';

  return (
    <div>
      <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data}  numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />

    </div>
  );
};

export default Movies;
