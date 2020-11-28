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
import { NextPage } from './FeedbackButtons';
import { useParams } from 'react-router-dom';

export function FormOne() {
  const interviewId = useParams().id;
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
        <NextPage feedbackValue={performanceLevel} />
      </div>
    </>
  );
}

export function FormTwo() {
  const interviewId = useParams().id;
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
      <div className={classes.feedbackFormCategoryContainer}>
        <div className={classes.feedbackCategoryRatingsContainer}>
          {categoryValues.map((category, index) => {
            return (
              <div className={classes.feedbackCategoryRatings} key={index}>
                {category}
              </div>
            );
          })}
        </div>
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
                      classes={{ root: classes.feedbackFormContainerLabel }}
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
      <div>
        <NextPage feedbackValue={categoryRatings} />
      </div>
    </>
  );
}

export function FormThree() {
  const interviewId = useParams().id;
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
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage strengths={strengths} feedbackValue={strengths} />
      </div>
    </>
  );
}

export function FormFour() {
  const interviewId = useParams().id;
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
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage feedbackValue={improvements} />
      </div>
    </>
  );
}

export function FormFive() {
  const interviewId = useParams().id;
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
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage resources={resources} feedbackValue={resources} />
      </div>
    </>
  );
}

export function FormSix() {
  const interviewId = useParams().id;
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
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage feedbackValue={other} />
      </div>
    </>
  );
}

export function FormSeven({ experienceRating, setExperienceRating }) {
  const interviewId = useParams().id;
  const classes = useStyles();
  const [experienceDescription, setExperienceDescription] = useState();

  useEffect(() => {
    async function setUserFeedback() {
      let result = await getFeedbackCreator(interviewId);
      if (result.data.feedback.experience) {
        setExperienceDescription(result.data.feedback.experience.description);
        setExperienceRating(result.data.feedback.experience.rating);
      }
    }
    setUserFeedback();
  }, []);

  const changeDescription = (e) => {
    setExperienceDescription(e.target.value);
  };

  const experience = {
    rating: experienceRating,
    description: experienceDescription,
  };

  return (
    <>
      <TextField
        placeholder='Text here...'
        variant='outlined'
        multiline
        rows={8}
        name='experience'
        onChange={changeDescription}
        defaultValue={experienceDescription}
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage feedbackValue={experience} />
      </div>
    </>
  );
}
