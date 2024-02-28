import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const favoriteMovies = [];

  const logout = ()=>{
    // clear the local storage
    localStorage.clear();

    // navigate to home page 
    window.location.href = '/'
  }
  return (<Box >
    <Box display='flex' justifyContent="space-between">
      <Typography variant="h4" gutterBottom>
        My Profile

      </Typography>
      <Button color="inherit" onClick={logout}>
        Logout &nbsp; <ExitToApp/>
      </Button>
    </Box>
    {
      !favoriteMovies.length ? <Typography variant="h5">Add favorite or watchlist a movie to see them here!</Typography>:(<Box>FAVORITE MOVIES</Box>)
    }

  </Box>)
};

export default Profile;
