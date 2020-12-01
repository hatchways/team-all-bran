import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import LanguageSelectMenu from './LanguageSelectMenu';
import { useHistory, useParams } from 'react-router-dom';
import { CustomButton } from '../components/Buttons';

const InterviewHeader = ({ language, setLanguage, partner }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const exitInterview = () => {
    history.push('/dashboard');
  };

  return (
    <Grid className={classes.interviewHeader} item xs={12}>
      <div className={classes.interviewWithText}>
        Interview with {`${partner.firstName || ''} ${partner.lastName || ''} `}{' '}
      </div>
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
