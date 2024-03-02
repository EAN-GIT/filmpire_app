import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RatedCards } from '..';

import {
  useGetListQuery,
 
} from '../../services/TMDB';
const Profile = () => {
  const { user } = useSelector((state) => state.user);

    // refecth to help reload the page after actin chnage
  const { data: favoriteMovies, refetch:refetchFavorites } = useGetListQuery({
      listName: 'favorite/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1
    });
  
    const { data: watchlistMovies, refetch:refetchWatchlisted } = useGetListQuery({
      listName: 'watchlist/movies',
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1
    });

    // tells redux to call changes so ythe page is always u to date
    useEffect(() => {
     refetchWatchlisted();
     refetchFavorites();
    }, [])
    

  const logout = () => {
    // clear the local storage
    localStorage.clear();

    // navigate to home page
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant='h5'>
          Add favorite or watchlist a movie to see them here!
        </Typography>
      ) : (
        <Box> 
          <RatedCards title='Favorite Movies' data={favoriteMovies}/>
          <RatedCards title='Watchlist' data={watchlistMovies}/>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
