import React from 'react';
import { useHistory } from 'react-router';
import { ContinueButton } from '../components/Buttons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import avatar from '../images/avatar.png';
import { useStyles } from '../themes/theme';

const WaitingRoomUserList = ({ userData }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid>
      <Grid>
        <div className={classes.demo}>
          <List>
            <div>
              {userData ? (
                userData.map(({ firstName, lastName }, index) => {
                  return (
                    <ListItem className={classes.waitingRoomUser} key={index}>
                      <Avatar alt='Avatar' src={avatar} />
                      <div
                        className={classes.waitingRoomUserName}
                      >{`${firstName} ${lastName}`}</div>
                    </ListItem>
                  );
                })
              ) : (
                  <p>Waiting Room Full</p>
                )}
            </div>
          </List>
          <ContinueButton onClick={() => history.push('/interview')} color='primary'>
            Start
          </ContinueButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default WaitingRoomUserList;
