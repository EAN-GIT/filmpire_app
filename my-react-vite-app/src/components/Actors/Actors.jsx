import { ArrowBack } from '@mui/icons-material';
import { CircularProgress, Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import {MovieList} from '..'

const Actors = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const history = useHistory();
  const [page, setPage] = useState(1);

  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  if (isFetching) {
    return (
      // box = div
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      // box = div
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color='primary'
        >
          Go back
        </Button>
      </Box>
    );
  }
  console.log({ ddd: data });
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography gutterBottom variant='h2'>
            {data?.name}
          </Typography>
          <Typography gutterBottom variant='h5'>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' paragraph align='justify'>
            {data?.biography || 'Sorry , no biography yet ...'}{' '}
          </Typography>

          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button
              variant='contained'
              color='primary'
              target='_blank'
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color='primary'
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* // movies by the actor  */}
      <Box margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;
