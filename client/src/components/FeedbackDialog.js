import React, { useState, useEffect } from 'react';
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
  FormSeven,
} from './FeedbackForms';
import { getFeedbackById, getFeedbackCreator } from '../utils/apiFunctions';

const questionData = [
  {
    question: 'Overall, how well did this person do in the interview?',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormOne
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question: 'Submit a review of the candidate in the following categories:',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormTwo
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question:
      'What are some things this candidate did well (the more specific the better)',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormThree
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question:
      'What are some things this candidate can improve on (the more specific the better)',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormFour
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question:
      'Any recommendations on resources that can help the candidate improve?',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormFive
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question: 'Anything else?',
    formContent: (viewFeedback, creatorFeedback, changeCreatorFeedback) => {
      return (
        <FormSix
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
  {
    question: 'Overall, how well did this person do in the interview?',
    formContent: (
      experienceRating,
      setExperienceRating,
      viewFeedback,
      creatorFeedback,
      changeCreatorFeedback
    ) => {
      return (
        <FormSeven
          experienceRating={experienceRating}
          setExperienceRating={setExperienceRating}
          viewFeedback={viewFeedback}
          creatorFeedback={creatorFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      );
    },
  },
];

const experienceRatingValues = {
  0: '',
  1: 'BAD!',
  2: 'OK!',
  3: 'GOOD!',
  4: 'GREAT!',
  5: 'AMAZING!',
};

const FeedbackDialog = () => {
  const { pageNumber, feedbackId, id } = useParams();
  const interviewId = id;
  const classes = useStyles();
  const [experienceRating, setExperienceRating] = useState(0);
  const [viewFeedback, setViewFeedback] = useState();
  const [creatorFeedback, setCreatorFeedback] = useState();

  useEffect(() => {
    async function setFeedbackById() {
      try {
        const feedback = await getFeedbackById(feedbackId);
        setViewFeedback(feedback.data.feedback);
      } catch (error) {
        setViewFeedback({ error: 'incorrect feedback Id' });
      }
    }
    if (feedbackId) {
      setFeedbackById();
    }
  }, []);

  useEffect(() => {
    async function setFeedbackChange() {
      const feedback = await getFeedbackCreator(interviewId);
      if (feedback.data.feedback) {
        setCreatorFeedback(feedback.data.feedback);
      }
    }

    if (interviewId) {
      setFeedbackChange();
    }
  }, []);

  const changeCreatorFeedback = async () => {
    let feedback = await getFeedbackCreator(interviewId);
    if (feedback.data.feedback) {
      setCreatorFeedback(feedback.data.feedback);
    }
  };
  console.log(pageNumber);
  const changeExperience = (experience) => {
    setExperienceRating(experience);
  };

  const question = questionData[pageNumber - 1].question;

  if (viewFeedback && viewFeedback.error) {
    return <div>incorrect feedback Id</div>;
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
          <h2 className={classes.feedbackDialogTitle}>
            {!viewFeedback ? 'Give us your Feedback' : 'Your Feedback'}
          </h2>
          <h3 className={classes.feedbackDialogSubheading}>
            {!viewFeedback
              ? 'Please leave your comments here'
              : 'These are the comments left by your interivewer'}
          </h3>
        </>
      ) : (
        <ExperienceContent
          setExperience={changeExperience}
          experienceRating={experienceRating}
          viewFeedback={viewFeedback}
        />
      )}
      <DialogContent>
        {pageNumber < 7 && (
          <div className={classes.feedbackDialogQuestionNumber}>
            <div className={classes.feedbackNumber}>{`Question ${pageNumber} `}</div>
            <div className={classes.feedbackRemainder}>/ 6</div>
          </div>
        )}

        <div className={classes.feedbackQuestion}>{question}</div>

        <FormControl disabled={viewFeedback}>
          {pageNumber < 7
            ? questionData[pageNumber - 1].formContent(
                viewFeedback,
                creatorFeedback,
                changeCreatorFeedback
              )
            : questionData[6].formContent(
                experienceRating,
                changeExperience,
                viewFeedback,
                creatorFeedback,
                changeCreatorFeedback
              )}
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

const ExperienceContent = ({ setExperience, experienceRating, viewFeedback }) => {
  const classes = useStyles();
  const [hoverExperience, setHoverExperience] = useState(-1);

  const changeRating = (e, value) => {
    setExperience(Number(value));
  };

  const changeRatingHover = (e, value) => {
    setHoverExperience(Number(value));
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
        readOnly={viewFeedback}
        classes={{ root: classes.feedbackExperienceRating }}
        value={
          !viewFeedback
            ? experienceRating
            : viewFeedback.experience && viewFeedback.experience.rating
        }
        onChange={changeRating}
        onChangeActive={changeRatingHover}
        size='large'
      />
    </>
  );
};

export default FeedbackDialog;
