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
import { getFeedbackById } from '../utils/apiFunctions';

const questionData = [
  {
    question: 'Overall, how well did this person do in the interview?',
    formContent: (viewFeedback) => {
      return <FormOne viewFeedback={viewFeedback} />;
    },
  },
  {
    question: 'Submit a review of the candidate in the following categories:',
    formContent: (viewFeedback) => {
      return <FormTwo viewFeedback={viewFeedback} />;
    },
  },
  {
    question:
      'What are some things this candidate did well (the more specific the better)',
    formContent: (viewFeedback) => {
      return <FormThree viewFeedback={viewFeedback} />;
    },
  },
  {
    question:
      'What are some things this candidate can improve on (the more specific the better)',
    formContent: (viewFeedback) => {
      return <FormFour viewFeedback={viewFeedback} />;
    },
  },
  {
    question:
      'Any recommendations on resources that can help the candidate improve?',
    formContent: (viewFeedback) => {
      return <FormFive viewFeedback={viewFeedback} />;
    },
  },
  {
    question: 'Anything else?',
    formContent: (viewFeedback) => {
      return <FormSix viewFeedback={viewFeedback} />;
    },
  },
  {
    question: 'Overall, how well did this person do in the interview?',
    formContent: (experienceRating, setExperienceRating, viewFeedback) => {
      return (
        <FormSeven
          experienceRating={experienceRating}
          setExperienceRating={setExperienceRating}
          viewFeedback={viewFeedback}
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
  const { pageNumber, feedbackId } = useParams();
  const classes = useStyles();
  const [experienceRating, setExperienceRating] = useState(0);
  const [viewFeedback, setViewFeedback] = useState();

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

  const changeExperience = (experience) => {
    setExperienceRating(experience);
  };

  const question = questionData[pageNumber - 1].question;
  //const question = 'A question';

  // let question;
  // let questionNumber;
  // let formContent;

  // switch (pageNumber) {
  //   case '1':
  //     question = 'Overall, how well did this person do in the interview?';
  //     questionNumber = '1';
  //     formContent = <FormOne viewFeedback={viewFeedback} />;
  //     break;
  //   case '2':
  //     question = 'Submit a review of the candidate in the following categories:';
  //     questionNumber = '2';
  //     formContent = <FormTwo viewFeedback={viewFeedback} />;
  //     break;
  //   case '3':
  //     question =
  //       'What are some things this candidate did well (the more specific the better)';
  //     questionNumber = '3';
  //     formContent = <FormThree viewFeedback={viewFeedback} />;
  //     break;
  //   case '4':
  //     question =
  //       'What are some things this candidate can improve on (the more specific the better)';
  //     questionNumber = '4';
  //     formContent = <FormFour viewFeedback={viewFeedback} />;
  //     break;
  //   case '5':
  //     question =
  //       'Any recommendations on resources that can help the candidate improve?';
  //     questionNumber = '5';
  //     formContent = <FormFive viewFeedback={viewFeedback} />;
  //     break;
  //   case '6':
  //     question = 'Anything else?';
  //     questionNumber = '6';
  //     formContent = <FormSix viewFeedback={viewFeedback} />;
  //     break;
  //   case '7':
  //     question = 'Describe your experience:';
  //     formContent = (
  //       <FormSeven
  //         experienceRating={experienceRating}
  //         setExperienceRating={setExperienceRating}
  //         viewFeedback={viewFeedback}
  //       />
  //     );
  // }

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
          {
            pageNumber < 7
              ? questionData[pageNumber - 1].formContent(viewFeedback)
              : questionData[6].formContent(
                  experienceRating,
                  changeExperience,
                  viewFeedback
                )
            //formContent
          }
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
        value={!viewFeedback ? experienceRating : viewFeedback.experience.rating}
        onChange={changeRating}
        onChangeActive={changeRatingHover}
        size='large'
      />
    </>
  );
};

export default FeedbackDialog;
