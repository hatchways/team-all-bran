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
import { NextQuestionButton, PreviousQuestionButton } from '../components/Buttons';
import axios from 'axios';
import { createFeedback, getFeedbackCreator } from '../utils/apiFunctions';

const interviewId = '5fbfcab4d54a3f7654ae5684'; // For testing purposes. To be changed later to pull from params

const FeedbackDialog = (props) => {
  const { pageNumber } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const nextPage = (event) => {
    event.preventDefault();
    console.log(event);
    if (pageNumber === '6') {
      history.push('/dashboard');
    } else {
      history.push(`/interview/feedback/${String(Number(pageNumber) + 1)}`);
    }
  };

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
      formContent = <FormThree pageNumber={pageNumber} />;
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
          {/* <NextQuestionButton
            variant='outlined'
            onClick={nextPage}
            color='primary'
            autoFocus
          >
            {pageNumber < 6 ? 'NEXT QUESTION' : 'SUMBIT'}
          </NextQuestionButton> */}
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

function FormOne() {
  const classes = useStyles();
  const history = useHistory();
  const ratingValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const [performanceLevel, setperformanceLevel] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.performanceLevel) {
        setperformanceLevel(result.data.feedback.performanceLevel);
      }
    }
    setUserFeedback();
  }, []);

  const changeLevel = (e) => {
    setperformanceLevel(Number(e.target.value));
  };

  const nextPage = async (e) => {
    e.preventDefault();

    const data = { performanceLevel: performanceLevel };

    if (performanceLevel) {
      try {
        const result = await createFeedback(interviewId, data);
        history.push(`/interview/feedback/2`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className={classes.feedbackFormContainer}>
        <FormLabel className={classes.feedbackFormLabel}>Terrible</FormLabel>
        <RadioGroup
          classes={{ root: classes.formRadioOne }}
          row
          aria-label='performanceLevel'
          name='performanceLevel'
          onChange={changeLevel}
          value={String(performanceLevel)}
        >
          {ratingValues.map((ratingValue, index) => {
            return (
              <FormControlLabel
                key={index}
                value={ratingValue}
                control={<Radio color='primary' />}
                label={ratingValue}
                labelPlacement='top'
              />
            );
          })}
        </RadioGroup>
        <FormLabel className={classes.feedbackFormLabel}>Perfect</FormLabel>
      </div>
      {error ? <FormHelperText>Please select a rating</FormHelperText> : ''}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        NEXT QUESTION
      </NextQuestionButton>
    </>
  );
}

function FormTwo() {
  const classes = useStyles();
  const history = useHistory();

  const [categoryRatings, setCategories] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.categories) {
        setCategories(result.data.feedback.categories);
      }
    }
    setUserFeedback();
  }, []);

  const nextPage = async (e) => {
    e.preventDefault();

    const {
      communication,
      codeEfficiency,
      codeOrganization,
      speed,
      debugging,
      problemSolving,
    } = categoryRatings;

    if (
      communication &&
      codeEfficiency &&
      codeOrganization &&
      speed &&
      debugging &&
      problemSolving
    ) {
      try {
        const result = await createFeedback(interviewId, {
          categories: categoryRatings,
        });
        history.push(`/interview/feedback/3`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  const changeCategories = (e) => {
    switch (e.target.name) {
      case 'Communication skills':
        setCategories({ ...categoryRatings, communication: Number(e.target.value) });
        break;
      case 'Code efficiency':
        setCategories({
          ...categoryRatings,
          codeEfficiency: Number(e.target.value),
        });
        break;
      case 'Code organization':
        setCategories({
          ...categoryRatings,
          codeOrganization: Number(e.target.value),
        });
        break;
      case 'Speed':
        setCategories({ ...categoryRatings, speed: Number(e.target.value) });
        break;
      case 'Debugging skills':
        setCategories({ ...categoryRatings, debugging: Number(e.target.value) });
        break;
      case 'Problem solving skills':
        setCategories({
          ...categoryRatings,
          problemSolving: Number(e.target.value),
        });
        break;
    }
  };

  const categories = [
    'Communication skills',
    'Code efficiency',
    'Code organization',
    'Speed',
    'Debugging skills',
    'Problem solving skills',
  ];

  const categoryScore = ['1', '2', '3', '4', '5'];
  const categoryValues = [
    'NEEDS IMPROVEMENT',
    'SATISFACTORY',
    'GOOD',
    'GREAT',
    'EXCELLENT',
  ];

  return (
    <>
      {/* <div className={classes.feedbackCategoryRatingsContainer}>
        {categoryValues.map((category, index) => {
          return (
            <div className={classes.feedbackCategoryRatings} key={index}>
              {category}
            </div>
          );
        })}
      </div> */}
      <div className={classes.feedbackFormContainer}>
        {/* <div>
          {categories.map((category, index) => {
            return <div key={index}>{category}</div>;
          })}
        </div> */}
        <div>
          {categories.map((category, index) => {
            let defaultValue;
            if (categoryRatings) {
              switch (category) {
                case 'Communication skills':
                  defaultValue = String(categoryRatings.communication);
                  break;
                case 'Code efficiency':
                  defaultValue = String(categoryRatings.codeEfficiency);
                  break;
                case 'Code organization':
                  defaultValue = String(categoryRatings.codeOrganization);
                  break;
                case 'Speed':
                  defaultValue = String(categoryRatings.speed);
                  break;
                case 'Debugging skills':
                  defaultValue = String(categoryRatings.debugging);
                  break;
                case 'Problem solving skills':
                  defaultValue = String(categoryRatings.problemSolving);
                  break;
              }
            }
            return (
              <RadioGroup
                classes={{ root: classes.feedbackFormContainerRadio }}
                key={index}
                row
                aria-label={category}
                name={category}
                value={defaultValue}
                onChange={changeCategories}
              >
                <label className={'GG'}>{category}</label>
                <div className={classes.feedbackFormRadio}>
                  {categoryScore.map((score, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={score}
                        control={<Radio color='primary' />}
                      />
                    );
                  })}
                </div>
              </RadioGroup>
            );
          })}
        </div>
      </div>
      {error ? (
        <FormHelperText>Please give feedback for all categories </FormHelperText>
      ) : (
        ''
      )}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        NEXT QUESTION
      </NextQuestionButton>
    </>
  );
}

function FormThree() {
  const classes = useStyles();
  const history = useHistory();
  const [strengths, setStrength] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.strengths) {
        setStrength(result.data.feedback.strengths);
      }
    }
    setUserFeedback();
  }, []);

  const changeStrengths = (e) => {
    setStrength(e.target.value);
  };

  const nextPage = async (e) => {
    e.preventDefault();

    if (strengths) {
      try {
        const result = await createFeedback(interviewId, { strengths: strengths });
        history.push(`/interview/feedback/4`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <TextField
        placeholder='Your answer...'
        variant='outlined'
        multiline
        rows={8}
        name='strength'
        onChange={changeStrengths}
        defaultValue={strengths}
      />
      {error ? <FormHelperText>Please provide some strengths </FormHelperText> : ''}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        NEXT QUESTION
      </NextQuestionButton>
    </>
  );
}

function FormFour() {
  const classes = useStyles();
  const history = useHistory();
  const [improvements, setImprovements] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.improvements) {
        setImprovements(result.data.feedback.improvements);
      }
    }
    setUserFeedback();
  }, []);

  const changeImprovements = (e) => {
    setImprovements(e.target.value);
  };

  const nextPage = async (e) => {
    e.preventDefault();

    if (improvements) {
      try {
        const result = await createFeedback(interviewId, {
          improvements: improvements,
        });
        history.push(`/interview/feedback/5`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <TextField
        placeholder='Your answer...'
        variant='outlined'
        multiline
        rows={8}
        name='improvements'
        onChange={changeImprovements}
        defaultValue={improvements}
      />
      {error ? <FormHelperText>Please provide some strengths </FormHelperText> : ''}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        NEXT QUESTION
      </NextQuestionButton>
    </>
  );
}

function FormFive() {
  const classes = useStyles();
  const history = useHistory();
  const [resources, setResources] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.resources) {
        setResources(result.data.feedback.resources);
      }
    }
    setUserFeedback();
  }, []);

  const changeResources = (e) => {
    setResources(e.target.value);
  };

  const nextPage = async (e) => {
    e.preventDefault();

    if (resources) {
      try {
        const result = await createFeedback(interviewId, {
          resources: resources,
        });
        history.push(`/interview/feedback/6`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <TextField
        placeholder='Your answer...'
        variant='outlined'
        multiline
        rows={8}
        name='resources'
        onChange={changeResources}
        defaultValue={resources}
      />
      {error ? <FormHelperText>Please provide some strengths </FormHelperText> : ''}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        NEXT QUESTION
      </NextQuestionButton>
    </>
  );
}

function FormSix() {
  const classes = useStyles();
  const history = useHistory();
  const [other, setOther] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.other) {
        setOther(result.data.feedback.other);
      }
    }
    setUserFeedback();
  }, []);

  const changeOther = (e) => {
    setOther(e.target.value);
  };

  const nextPage = async (e) => {
    e.preventDefault();

    if (other) {
      try {
        const result = await createFeedback(interviewId, {
          other: other,
        });
        history.push(`/dashboard`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <TextField
        placeholder='Your answer...'
        variant='outlined'
        multiline
        rows={8}
        name='other'
        onChange={changeOther}
        defaultValue={other}
      />
      {error ? <FormHelperText>Please provide some strengths </FormHelperText> : ''}
      <NextQuestionButton
        variant='outlined'
        onClick={nextPage}
        color='primary'
        autoFocus
      >
        SUBMIT
      </NextQuestionButton>
    </>
  );
}

export default FeedbackDialog;
