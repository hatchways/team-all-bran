import React, { useContext, useEffect, useState } from 'react';
import avatar from '../images/avatar.png';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { store } from '../context/store';

import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { LOGOUT } from '../context/types';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-around`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`,
  },
});

const navLinks = [
  { title: `dashboard`, path: `/dashboard` },
  { title: `faq`, path: `/faq` },
  { title: `blog`, path: `/blog` },
];

const Navbar = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  console.log('OUTPUT: Navbar -> state', state);

  let firstName = '';
  let lastName = '';
  useEffect(() => {
    console.log(state);
    if (state.user.user) {
      firstName = state.user.user.firstName;
      lastName = state.user.user.lastName;
    }
  }, [state]);

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e, route) => {
    setAnchorEl(null);
    history.push(route);
    if (route === '/signup') {
      dispatch({ type: LOGOUT });
    }
  };

  return (
    <AppBar color='default' position='static'>
      <Toolbar>
        <Link to='/dashboard'>
          <IconButton edge='start' color='inherit' aria-label='home'>
            <Home fontSize='large' />
          </IconButton>
        </Link>
        <Container maxWidth='md' className={classes.navbarDisplayFlex}>
          <List
            component='nav'
            aria-labelledby='main navigation'
            className={classes.navDisplayFlex}
          >
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <IconButton
            onClick={handleClick}
            edge='end'
            color='inherit'
            aria-label='home'
            aria-controls='simple-menu'
            aria-haspopup='true'
          >
            <Avatar alt='Avatar' src={avatar} />

            {`${firstName} ${lastName}`}
          </IconButton>
        </Container>

        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={(e) => handleClose(e, '/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={(e) => handleClose(e, '/signup')}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
