import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { useParams, useHistory } from 'react-router-dom';
import { PreviousQuestionButton } from './Buttons';
import {
  FormOne,
  FormTwo,
  FormThree,
  FormFour,
  FormFive,
  FormSix,
} from './FeedbackForms';
import { createFeedback, getFeedbackCreator } from '../utils/apiFunctions';

const interviewId = '5fbfcab4d54a3f7654ae5684'; // For testing purposes. To be changed later to pull from params

const FeedbackDialog = () => {
  const { pageNumber } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [feedback, setFeedback] = useState();

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback) {
        setFeedback(result.data.feedback);
      }
    }
    setUserFeedback();
  });

  const prevPage = () => {
    history.push(`/interview/feedback/${String(Number(pageNumber) - 1)}`);
  };

  let question;
  let questionNumber;
  let formContent;

  switch (pageNumber) {
    case '1':
      question = 'Overall, how well did this person do in the interview?';
      questionNumber = '1';
      formContent = <FormOne pageNumber={pageNumber} />;
      break;
    case '2':
      question = 'Submit a review of the candidate in the following categories:';
      questionNumber = '2';
      formContent = <FormTwo />;
      break;
    case '3':
      question =
        'What are some things this candidate did well (the more specific the better)';
      questionNumber = '3';
      formContent = <FormThree />;
      break;
    case '4':
      question =
        'What are some things this candidate can improve on (the more specific the better)';
      questionNumber = '4';
      formContent = <FormFour />;
      break;
    case '5':
      question =
        'Any recommendations on resources that can help the candidate improve?';
      questionNumber = '5';
      formContent = <FormFive />;
      break;
    case '6':
      question = 'Anything else?';
      questionNumber = '6';
      formContent = <FormSix />;
      break;
  }
  console.log(feedback);
  return (
    <Dialog
      PaperProps={{ classes: { root: classes.feedbackDialog } }}
      open={true}
      fullWidth={true}
      maxWidth='lg'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {/* <DialogTitle classes={{ root: classes.feedbackDialogTitle }}>
        Give us your Feedback
      </DialogTitle> */}
      <h2 className={classes.feedbackDialogTitle}>Give us your Feedback</h2>
      <h3 className={classes.feedbackDialogSubheading}>
        Please leave your comments here
      </h3>
      <DialogContent>
        <div className={classes.feedbackDialogQuestionNumber}>
          <div
            className={classes.feedbackNumber}
          >{`Question ${questionNumber} `}</div>
          <div className={classes.feedbackRemainder}>/ 6</div>
        </div>

        <div className={classes.feedbackQuestion}>{question}</div>

        <FormControl classes={{ root: classes.one }}>
          {formContent}
          {pageNumber > 1 ? (
            <PreviousQuestionButton
              variant='outlined'
              onClick={prevPage}
              color='primary'
              autoFocus
            >
              PREVIOUS QUESTION
            </PreviousQuestionButton>
          ) : (
            ''
          )}
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
