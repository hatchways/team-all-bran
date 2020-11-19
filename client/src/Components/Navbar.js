import React, { useContext, useState } from 'react';
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
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

import Avatar from '@material-ui/core/Avatar';
import { LOGOUT } from '../context/types';
import { useStyles } from '../themes/theme';

const navLinks = [
  { title: `Dashboard`, path: `/dashboard` },
  { title: `FAQ`, path: `/faq` },
  { title: `Blog`, path: `/blog` },
];

const Navbar = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);
  console.log(state);

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleGoToRoute = (_, route) => {
    history.push(route);
    if (route === '/signup') {
      dispatch({ type: LOGOUT });
      localStorage.clear();
    }
  };

  const [selected, setSelected] = useState(0);

  return state.isAuthenticated ? (
    <AppBar color='default' position='static'>
      <Toolbar className={classes.navBarContainer}>
        <div>
          <Link to='/dashboard'>
            <IconButton color='inherit' aria-label='home'>
              <Home fontSize='large' />
            </IconButton>
          </Link>
        </div>

        <div className={classes.navbarDisplayFlex}>
          <List
            className={classes.navbarDisplayFlex}
            component='nav'
            aria-labelledby='main navigation'
          >
            {navLinks.map(({ title, path }, idx) => (
              <Link to={path} key={title} style={{ textDecoration: 'none' }}>
                <ListItem
                  className={
                    selected === idx ? classes.linkTextSelected : classes.linkText
                  }
                  onClick={() => setSelected(idx)}
                >
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>{' '}
          <IconButton
            onClick={handleClick}
            color='inherit'
            aria-label='home'
            aria-controls='simple-menu'
            aria-haspopup='true'
          >
            <Avatar alt='Avatar' src={avatar} />
            <div
              className={classes.userNameDiv}
            >{`${state.user.firstName} ${state.user.lastName}`}</div>
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            // keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={(e) => handleGoToRoute(e, '/profile')}>
              Profile
            </MenuItem>
            <MenuItem onClick={(e) => handleGoToRoute(e, '/signup')}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  ) : null;
};
export default Navbar;
