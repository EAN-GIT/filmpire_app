import React from "react";

import useStyles from "./styles";
import { Grid, Typography } from "@mui/material";

const Movie = ({ movies, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Typography className={classes.title} variant="h5">
        {movies.title}
      </Typography>
    </Grid>
  );
};

export default Movie;
