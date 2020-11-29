import React from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import LanguageSelectMenu from './LanguageSelectMenu';
import { CustomButton } from '../components/Buttons';
import { useHistory } from 'react-router-dom';

const InterviewHeader = ({ language, setLanguage }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const exitInterview = () => {
    history.push('/dashboard');
  }

  return (
    <Grid className={classes.interviewHeader} item xs={12}>
      <div className={classes.interviewWithText}>Interview with </div>
      <div className={classes.languageExitInterviewContainer}>
        <LanguageSelectMenu handleLanguageChange={handleLanguageChange} language={language} />
        <CustomButton onClick={exitInterview} classField={classes.exitInterviewButton} text="End Interview" />
      </div>
    </Grid>
  );
}

export default InterviewHeader;
