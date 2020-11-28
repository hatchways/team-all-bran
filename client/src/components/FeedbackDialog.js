import React, { useState } from 'react';
import { Dialog, DialogContent, FormControl } from '@material-ui/core/';
import { Rating } from '@material-ui/lab';
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
import { FormSeven } from './FeedbackForms';

const FeedbackDialog = () => {
  const { pageNumber } = useParams();
  const classes = useStyles();
  const [experienceRating, setExperienceRating] = useState(0);

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
    case '7':
      question = 'Describe your experience:';
      formContent = (
        <FormSeven
          experienceRating={experienceRating}
          setExperienceRating={setExperienceRating}
        />
      );
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
      {pageNumber < 7 ? (
        <>
          <h2 className={classes.feedbackDialogTitle}>Give us your Feedback</h2>
          <h3 className={classes.feedbackDialogSubheading}>
            Please leave your comments here
          </h3>
        </>
      ) : (
        <ExperienceContent
          setExperience={setExperienceRating}
          experienceRating={experienceRating}
        />
      )}
      <DialogContent>
        {pageNumber < 7 && (
          <div className={classes.feedbackDialogQuestionNumber}>
            <div
              className={classes.feedbackNumber}
            >{`Question ${questionNumber} `}</div>
            <div className={classes.feedbackRemainder}>/ 6</div>
          </div>
        )}

        <div className={classes.feedbackQuestion}>{question}</div>

        <FormControl>{formContent}</FormControl>
      </DialogContent>
    </Dialog>
  );
};

const ExperienceContent = ({ setExperience, experienceRating }) => {
  const classes = useStyles();
  const [hoverExperience, setHoverExperience] = useState(-1);

  const changeRating = (e, value) => {
    setExperience(Number(value));
  };

  const changeRatingHover = (e, value) => {
    setHoverExperience(Number(value));
  };

  let experienceRatingValues = {
    0: '',
    1: 'BAD!',
    2: 'OK!',
    3: 'GOOD!',
    4: 'GREAT!',
    5: 'AMAZING!',
  };

  return (
    <>
      <h2 className={classes.feedbackDialogTitle}>
        Rate & review your experience with your match:
      </h2>

      <div className={classes.feedbackExperienceRatingDesc}>
        {
          experienceRatingValues[
            hoverExperience !== -1 ? hoverExperience : experienceRating
          ]
        }
      </div>
      <Rating
        name='feedbackExperience'
        classes={{ root: classes.feedbackExperienceRating }}
        value={experienceRating}
        onChange={changeRating}
        onChangeActive={changeRatingHover}
        size='large'
      />
    </>
  );
};

export default FeedbackDialog;
