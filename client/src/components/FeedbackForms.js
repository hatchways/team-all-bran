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
  Select,
} from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { useHistory } from 'react-router-dom';
import { NextQuestionButton, PreviousQuestionButton } from '../components/Buttons';
import { createFeedback, getFeedbackCreator } from '../utils/apiFunctions';

const interviewId = '5fbfcab4d54a3f7654ae5684'; // For testing purposes. To be changed later to pull from params

const NextPage = ({
  feedbackType,
  performanceLevel,
  categories,
  strengths,
  improvements,
  resources,
  other,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState(false);

  const addPerformance = async () => {
    if (performanceLevel) {
      try {
        await createFeedback(interviewId, { performanceLevel: performanceLevel });
        history.push(`/interview/feedback/2`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  const addCategories = async () => {
    const {
      communication,
      codeEfficiency,
      codeOrganization,
      speed,
      debugging,
      problemSolving,
    } = categories;

    if (
      communication &&
      codeEfficiency &&
      codeOrganization &&
      speed &&
      debugging &&
      problemSolving
    ) {
      try {
        await createFeedback(interviewId, {
          categories: categories,
        });
        history.push(`/interview/feedback/3`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  const addStrengths = async () => {
    if (strengths) {
      try {
        await createFeedback(interviewId, { strengths: strengths });
        history.push(`/interview/feedback/4`);
      } catch (error) {
        console.error(error);
      }
    } else {
      setError(true);
    }
  };

  const addImprovements = async () => {
    if (improvements) {
      try {
        await createFeedback(interviewId, {
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

  const addResources = async () => {
    if (resources) {
      try {
        await createFeedback(interviewId, {
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

  const addOther = async () => {
    if (other) {
      try {
        await createFeedback(interviewId, {
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

  const nextPage = async (e) => {
    e.preventDefault();

    switch (feedbackType) {
      case 'performance':
        addPerformance();
        break;
      case 'categories':
        addCategories();
        break;
      case 'strengths':
        addStrengths();
        break;
      case 'improvements':
        addImprovements();
        break;
      case 'resources':
        addResources();
        break;
      case 'other':
        addOther();
        break;
    }
  };

  return (
    <>
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
};

export function FormOne() {
  const classes = useStyles();
  const ratingValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const [performanceLevel, setperformanceLevel] = useState();

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
      <NextPage feedbackType='performance' performanceLevel={performanceLevel} />
    </>
  );
}

export function FormTwo() {
  const classes = useStyles();
  const [categoryRatings, setCategories] = useState({});

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.categories) {
        setCategories(result.data.feedback.categories);
      }
    }
    setUserFeedback();
  }, []);

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
      <NextPage feedbackType='categories' categories={categoryRatings} />
    </>
  );
}

export function FormThree() {
  const classes = useStyles();
  const [strengths, setStrength] = useState();

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
      <NextPage feedbackType='strengths' strengths={strengths} />
    </>
  );
}

export function FormFour() {
  const classes = useStyles();
  const [improvements, setImprovements] = useState();

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
      <NextPage feedbackType='improvements' improvements={improvements} />
    </>
  );
}

export function FormFive() {
  const classes = useStyles();
  const [resources, setResources] = useState();

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
      <NextPage feedbackType='resources' resources={resources} />
    </>
  );
}

export function FormSix() {
  const classes = useStyles();
  const [other, setOther] = useState();

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
      <NextPage feedbackType='other' other={other} />
    </>
  );
}
