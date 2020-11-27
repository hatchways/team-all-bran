import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { getFeedbackCreator } from '../utils/apiFunctions';
import { NextPage, PrevPage } from './FeedbackButtons';
const interviewId = '5fbfcab4d54a3f7654ae5684'; // For testing purposes. To be changed later to pull from params

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
      <div>
        <NextPage feedbackType='performance' performanceLevel={performanceLevel} />
      </div>
    </>
  );
}

export function FormTwo({ pageNumber }) {
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
      <div>
        <PrevPage pageNumber={pageNumber} />
        <NextPage feedbackType='categories' categories={categoryRatings} />
      </div>
    </>
  );
}

export function FormThree({ pageNumber }) {
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
      <div>
        <PrevPage pageNumber={pageNumber} />
        <NextPage feedbackType='strengths' strengths={strengths} />
      </div>
    </>
  );
}

export function FormFour({ pageNumber }) {
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
      <div>
        <PrevPage pageNumber={pageNumber} />
        <NextPage feedbackType='improvements' improvements={improvements} />
      </div>
    </>
  );
}

export function FormFive({ pageNumber }) {
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
      <div>
        <PrevPage pageNumber={pageNumber} />
        <NextPage feedbackType='resources' resources={resources} />
      </div>
    </>
  );
}

export function FormSix({ pageNumber }) {
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
      <div>
        <PrevPage pageNumber={pageNumber} />
        <NextPage feedbackType='other' other={other} />
      </div>
    </>
  );
}
