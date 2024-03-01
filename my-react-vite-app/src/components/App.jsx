// eslint-disable-next-line no-unused-vars
import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { Actors, Movieinfo, Movies, Profile, NavBar } from './index';

import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={['/', '/approved']}>
            <Movies />
          </Route>
          <Route exact path='/movie/:id'>
            <Movieinfo />
          </Route>
          <Route exact path='/profile/:id'>
            <Profile />
          </Route>
          <Route exact path='/actors/:id'>
            <Actors />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
