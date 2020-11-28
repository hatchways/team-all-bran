import React from 'react';
import { Dialog, DialogContent, FormControl } from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { useParams } from 'react-router-dom';
import {
  FormOne,
  FormTwo,
  FormThree,
  FormFour,
  FormFive,
  FormSix,
} from './FeedbackForms';

const FeedbackDialog = () => {
  const { pageNumber } = useParams();
  const classes = useStyles();

  let question;
  let questionNumber;
  let formContent;

  switch (pageNumber) {
    case '1':
      question = 'Overall, how well did this person do in the interview?';
      questionNumber = '1';
      formContent = <FormOne />;
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
  return (
    <Dialog
      PaperProps={{ classes: { root: classes.feedbackDialog } }}
      open={true}
      fullWidth={true}
      maxWidth='lg'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
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

        <FormControl>{formContent}</FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
