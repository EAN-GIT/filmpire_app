import React, { useEffect } from 'react';

import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import { useGetGenreQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres/index';
import { useDispatch, useSelector } from 'react-redux';
// action creator
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const redLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';

const blueLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'Popular',
    value: 'popular'
  },
  {
    label: 'Top Rated',
    value: 'top_rated'
  },
  {
    label: 'Upcoming',
    value: 'upcoming'
  }
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  // allows for data transfer to redux
  const dispatch = useDispatch();

  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  // selector selectwhich slice we want to get
  const { data, isFetching } = useGetGenreQuery();


  // so that the side cose after clicking on an option
  useEffect(()=>{
    setMobileOpen(false)
  },[genreIdOrCategoryName])
  return (
    <>
      <Link to='/' className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt='Filmpire logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => {
          return (
            <Link key={value} className={classes.links} to='/'>
              <ListItem
                // component='button'
                onClick={() => dispatch(selectGenreOrCategory(value))}
              >
                {/* will travel to the stor then the associate reducer  */}
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    alt={`item ${value} logo`}
                    className={classes.genreImage}
                    height={18}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListSubheader> Genre</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress />
          </Box>
        ) : (
          data?.genres?.map(({ name, id }) => {
            return (
              <Link
                key={name}
                className={classes.links}
                to='/'
              >
                <ListItem
                  onClick={() => dispatch(selectGenreOrCategory(id))}
                  // component='button'
                >
                  {/* will travel to the stor then the associate reducer  */}
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      alt={`item ${name} logo`}
                      className={classes.genreImage}
                      height={18}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            );
          })
        )}
      </List>
    </>
  );
};

export default Sidebar;

// import React, { useEffect } from 'react';
// import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@mui/styles';
// import { useDispatch, useSelector } from 'react-redux';

// import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
// import { useGetGenreQuery } from '../../services/TMDB';
// import useStyles from './styles';
// import genreIcons from '../../assets/genres';

// const categories = [
//   { label: 'Popular', value: 'popular' },
//   { label: 'Top Rated', value: 'top_rated' },
//   { label: 'Upcoming', value: 'upcoming' },
// ];

// const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
// const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

// const Sidebar = ({ setMobileOpen }) => {
//   const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
//   const theme = useTheme();
//   const classes = useStyles();
//   const { data, isFetching } = useGetGenreQuery();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [genreIdOrCategoryName]);

//   return (
//     <>
//       <Link to="/" className={classes.imageLink}>
//         <img
//           className={classes.image}
//           src={theme.palette.mode === 'light' ? redLogo : blueLogo}
//           alt="Filmpire logo"
//         />
//       </Link>
//       <Divider />
//       <List>
//         <ListSubheader>Categories</ListSubheader>
//         {categories.map(({ label, value }) => (
//           <Link key={value} className={classes.links} to="/">
//             <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
//               <ListItemIcon>
//                 <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
//               </ListItemIcon>
//               <ListItemText primary={label} />
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         <ListSubheader>Genres</ListSubheader>
//         {isFetching ? (
//           <Box display="flex" justifyContent="center">
//             <CircularProgress />
//           </Box>
//         ) : data.genres.map(({ name, id }) => (
//           <Link key={name} className={classes.links} to="/">
//             <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
//               <ListItemIcon>
//                 <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
//               </ListItemIcon>
//               <ListItemText primary={name} />
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//     </>
//   );
// };

// export default Sidebar;

