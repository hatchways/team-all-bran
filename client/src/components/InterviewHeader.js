import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import LanguageSelectMenu from './LanguageSelectMenu';
import { CustomButton } from '../components/Buttons';
import { useHistory, useParams } from 'react-router-dom';
import FeedbackDialog from '../components/FeedbackDialog';

const InterviewHeader = ({ language, setLanguage }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id, pageNumber } = useParams();
  const interviewId = id;

  const [openFeedback, setOpenFeedback] = useState(false);

  useEffect(() => {
    if (pageNumber) {
      setOpenFeedback(true);
    }
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const exitInterview = () => {
    setOpenFeedback(true);
    history.push(`/interview/${interviewId}/feedback/1`);
  };

  return (
    <Grid className={classes.interviewHeader} item xs={12}>
      <div className={classes.interviewWithText}>Interview with </div>
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
      {openFeedback ? <FeedbackDialog /> : ''}
    </Grid>
  );
};

export default InterviewHeader;
