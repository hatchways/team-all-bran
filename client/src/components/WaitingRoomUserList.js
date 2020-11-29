import React from 'react';
import { useHistory } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import avatar from '../images/avatar.png';
import { useStyles } from '../themes/theme';

const WaitingRoomUserList = ({ userData }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Grid>
        <div className={classes.demo}>
          <List>
            <div>
              {userData.map(({ firstName, lastName, isOwner }, index) => {
                return (
                  <ListItem className={classes.waitingRoomUser} key={index}>
                    <Avatar alt='Avatar' src={avatar} />
                    <div
                      className={classes.waitingRoomUserName}
                    >{`${firstName} ${lastName} ${isOwner ? '(Owner)' : ''}`}</div>
                  </ListItem>
                );
              })}
            </div>
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default WaitingRoomUserList;
