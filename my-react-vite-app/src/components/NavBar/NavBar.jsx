import React, { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { Sidebar, Search } from "..";

import { createSessionId, fetchToken, moviesApi } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth";

const NavBar = () => {
  // fetch the states from store
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log(user);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          // Fetch user data using the session ID
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );

          // This userData fetched from API is used for user authentication or to populate user profile in Redux store
          dispatch(setUser(userData));
        } else {
          const sessionId = createSessionId();

          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          // set user account to redux store
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token, dispatch, sessionIdFromLocalStorage]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={
                    // eslint-disable-next-line max-len
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fuser-avatar-placeholder-black_6796227.html&psig=AOvVaw10grANKYJs17_f2M7JBDMD&ust=1706624464940000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLD-4YrngoQDFQAAAAAdAAAAABAD"
                  }
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prev) => !prev)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
