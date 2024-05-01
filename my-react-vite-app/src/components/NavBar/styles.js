// import { makeStyles } from '@mui/styles';

// const drawerWidth = 240;

// export default makeStyles((theme) => ({
//   toolbar: {
//     height: '80px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginLeft: '240px', // Keeps the toolbar content from being aligned at the left edge
//     [theme.breakpoints.down('sm')]: {
//       // All styles here will be applied for mobile devices
//       marginLeft: '0', // Reset margin for smaller screens
//       flexWrap: 'wrap' // Allows content to wrap when the screen size is reduced
//     }
//   },
//   menuButton: {
//     marginRight: theme.spacing(2), // Adds spacing between the menu button and other elements
//     [theme.breakpoints.up('sm')]: {
//       display: 'none' // Hides the menu button on larger screens
//     }
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0
//     }
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   linkButton: {
//     '&:hover': {
//       color: 'white !important',
//       textDecoration: 'none'
//     }
//   }
// }));


import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
}));