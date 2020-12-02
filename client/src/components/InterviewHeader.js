import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import LanguageSelectMenu from './LanguageSelectMenu';
import { CustomButton } from '../components/Buttons';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, useParams } from 'react-router-dom';
import { endInterview } from '../utils/apiFunctions';
import FeedbackDialog from '../components/FeedbackDialog';

const InterviewHeader = (
  {
    language,
    setLanguage,
    partner,
    callPeer
  }) => {
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

  const exitInterview = async () => {
    try {
      await endInterview(interviewId);
    } catch (error) {
      console.error(error);
    }
    await history.push(`/interview/${interviewId}/feedback/1`);
    setOpenFeedback(true);
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
        <IconButton onClick={callPeer}>
          <VideoCallIcon className={classes.videoCallIcon} />
        </IconButton>
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
