import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import LanguageSelectMenu from './LanguageSelectMenu';

import { useHistory, useParams } from 'react-router-dom';
import { store } from '../context/store';
import SocketContext from '../context/socket';
import { CustomButton } from '../components/Buttons';

const InterviewHeader = ({ language, setLanguage, userData }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    state: {
      user: { firstName, lastName },
    },
  } = useContext(store);

  const socket = useContext(SocketContext);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const { id: roomId } = useParams();

  const [first, setFirst] = useState('');

  useEffect(() => {
    socket.emit('get_partner_name', { firstName, lastName, roomId });
    return () => {};
  }, [firstName, lastName, socket, roomId]);
  useEffect(() => {
    socket.on('set_partner_name', ({ firstName, lastName }) => {
      setFirst(firstName + ' ' + lastName);
    });
    return () => {};
  }, [socket]);

  const exitInterview = () => {
    history.push('/dashboard');
  };

  return (
    <Grid className={classes.interviewHeader} item xs={12}>
      <div className={classes.interviewWithText}>Interview with {`${first} `} </div>
      <div className={classes.languageExitInterviewContainer}>
        <LanguageSelectMenu
          handleLanguageChange={handleLanguageChange}
          language={language}
        />
        <CustomButton
          onClick={exitInterview}
          classField={classes.exitInterviewButton}
          text='End Interview'
        />
      </div>
    </Grid>
  );
};

export default InterviewHeader;
