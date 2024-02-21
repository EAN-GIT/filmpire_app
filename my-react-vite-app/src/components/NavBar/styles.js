import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  //   to be able to use theme wrap the entire application with it
  toolbar: {
    height: "80px",
    display: "flex",
    marginLeft: "240px",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      // all styles here will be applied to mobile
      marginLeft: "0",
      flexWrap: "wrap",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2), // special mui function for unifor spacing
    [theme.breakpoints.up("sm")]: {
      // all styles here will be applied to large screens not mobile
      display: "none",
    },
  },
  drawer: {
    //applied to large screens
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    "&:hover": {
      color: "white !important",
      textDecoration: "none",
    },
  },
}));
