import {
  CircularProgress,
  Box,
  Grid,
  Typography,
  Modal,
  Rating,
  ButtonGroup,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery
} from '../../services/TMDB';
import genreIcons from '../../assets/genres';

import useStyles from './styles';

import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack
} from '@mui/icons-material';

import MovieList from '../MovieList/MovieList';
import { useState } from 'react';

const tmdbApiKey = 'd1df4024678d5579405a85ef7d474ae7';

const Movieinfo = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // allows for data transfer to redux
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetMovieQuery(id);
  // to know id themovie is favorited or watchlisted
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });

  const { data: watchlistMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ movie_id: id, list: '/recommendations' });

  // to know id themovie is favorited or watchlisted
  // !!{} -> false -> true
  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  //"Fix the process.env being undefined"

  // console.log(process.env.REACT_APP_TMDB_KEY)
  // we using a api request here because we donet need the info store in global state like reux allows us
  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        favorite: !isMovieFavorited
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${tmdbApiKey}&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie',
        media_id: id,
        watchlist: !isMovieWatchlisted
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };
  return (
    <Grid container className={classes.containerSpaceAround}>
      {/* // movie img */}
      <Grid
        item
        sm={12}
        lg={4}
        style={{
          display: 'flex',
          marginBottom: '30px',
          // alignSelf: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        {/* tag line  */}
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display='flex' align='center'>
            {/* rating */}
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant='subtitle1'
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          {/* languages movie  */}
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>

        {/* 3rd grid genres  */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to='/'
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        {/* .....PART 2 */}
        <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Top Cast
        </Typography>

        {/* CAST PICTURES  */}
        <Grid item container spacing={2}>
          {data &&
            data.credits.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color='textPrimary'>
                        {character?.name}
                      </Typography>
                      <Typography color='textSecondary'>
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href='#'
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    style={{ textDecoration: 'none' }}
                    component={Link}
                    to='/'
                    color='inherit'
                    variant='subtitle2'
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {/* loop through the recoommended movies  */}
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            style={{ border: 'none' }}
            title='Trailer'
            src={`https:www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default Movieinfo;
