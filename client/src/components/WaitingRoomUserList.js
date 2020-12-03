import React, { useContext } from 'react';
import { store } from '../context/store';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import avatar from '../images/avatar.png';
import { useStyles } from '../themes/theme';

const WaitingRoomUserList = ({ userData, showStartButton }) => {
  const classes = useStyles();

  const { state } = useContext(store);

  return (
    <Grid>
      <Grid>
        <div className={classes.demo}>
          <List>
            <div>
              {userData.map(
                ({ firstName, lastName, isOwner, profilePicture }, index) => {
                  return (
                    <ListItem className={classes.waitingRoomUser} key={index}>
                      <Avatar
                        alt='Avatar'
                        src={profilePicture ? profilePicture : avatar}
                      />
                      <div
                        className={classes.waitingRoomUserName}
                      >{`${firstName} ${lastName} ${isOwner ? '(Owner)' : ''}`}</div>
                    </ListItem>
                  );
                }
              )}
            </div>
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default WaitingRoomUserList;
