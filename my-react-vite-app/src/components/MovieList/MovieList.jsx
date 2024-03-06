import React from 'react';

import useStyles from './styles';
import { Grid, Modal } from '@mui/material';
import { Movie } from '..';

const MovieList = ({ movies ,numberOfMovies , excludeFirst}) => {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 :0
  return (
    <Grid container className={classes.moviesContainer}>
      <>
        {movies.results.slice(startFrom,numberOfMovies).map((movie, i) => {
          return <Movie key={i} movie={movie} i={i} />;
        })}
      </>
    </Grid>
    
  );
};

export default MovieList;
