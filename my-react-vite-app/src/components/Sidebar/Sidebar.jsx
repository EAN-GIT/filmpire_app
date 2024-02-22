import React, { useEffect } from "react";

import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import {  useGetGenreQuery } from "../../services/TMDB";

const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";

const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const categories = [
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top_rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

  const {data , isFetching} = useGetGenreQuery();
  console.log(data)

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <ListSubheader>Categories</ListSubheader>
      {categories.map(({ label, value }) => {
        return (
          <Link key={value} className={classes.links} to="/my-react-vite-app">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt={`item ${label} logo`}
                  className={classes.genreImages}
                  height={18}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        );
      })}
      <Divider />
      <ListSubheader> Genre</ListSubheader>
      { isFetching ? ( <Box display="flex" justifyContent='center'>
        <CircularProgress/>
      </Box>) : data.genres.map(({ name, id }) => {
        return (
          <Link key={name} className={classes.links} to="/my-react-vite-app">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  alt={`item ${name} logo`}
                  className={classes.genreImages}
                  height={18}
                />
              </ListItemIcon> */}
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        );
      })}
    </>
  );
};

export default Sidebar;
