import React from 'react';

import useStyles from './styles';
import { Grid, Modal } from '@mui/material';
import { Movie } from '..';

const MovieList = ({ movies ,numberOfMovies }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      <>
        {movies.results.slice(0,numberOfMovies).map((movie, i) => {
          return <Movie key={i} movie={movie} i={i} />;
        })}
      </>
    </Grid>
    
  );
};

export default MovieList;
