import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { NextPage } from './FeedbackButtons';
export function FormOne({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const ratingValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const [performanceLevel, setperformanceLevel] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.performanceLevel) {
      setperformanceLevel(creatorFeedback.performanceLevel);
    }
  }, [creatorFeedback]);

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
          value={
            !viewFeedback
              ? String(performanceLevel)
              : String(viewFeedback.performanceLevel)
          }
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
        <NextPage
          feedbackValue={performanceLevel}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormTwo({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const [categoryRatings, setCategories] = useState({});

  useEffect(() => {
    if (viewFeedback) {
      setCategories(viewFeedback.categories);
    } else {
      if (creatorFeedback && creatorFeedback.categories) {
        setCategories(creatorFeedback.categories);
      }
    }
  }, [creatorFeedback]);

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
        <NextPage
          feedbackValue={categoryRatings}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormThree({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const [strengths, setStrength] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.strengths) {
      setStrength(creatorFeedback.strengths);
    }
  }, [creatorFeedback]);

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
        disabled={viewFeedback}
        defaultValue={!viewFeedback ? strengths : viewFeedback.strengths}
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage
          strengths={strengths}
          feedbackValue={strengths}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormFour({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const [improvements, setImprovements] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.improvements) {
      setImprovements(creatorFeedback.improvements);
    }
  }, [creatorFeedback]);

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
        disabled={viewFeedback}
        defaultValue={!viewFeedback ? improvements : viewFeedback.improvements}
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage
          feedbackValue={improvements}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormFive({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const [resources, setResources] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.resources) {
      setResources(creatorFeedback.resources);
    }
  }, [creatorFeedback]);

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
        disabled={viewFeedback}
        defaultValue={!viewFeedback ? resources : viewFeedback.resources}
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage
          resources={resources}
          feedbackValue={resources}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormSix({ viewFeedback, creatorFeedback, changeCreatorFeedback }) {
  const classes = useStyles();
  const [other, setOther] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.other) {
      setOther(creatorFeedback.other);
    }
  }, [creatorFeedback]);

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
        disabled={viewFeedback}
        defaultValue={!viewFeedback ? other : viewFeedback.other}
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage
          feedbackValue={other}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}

export function FormSeven({
  experienceRating,
  setExperienceRating,
  viewFeedback,
  creatorFeedback,
  changeCreatorFeedback,
}) {
  const classes = useStyles();
  const [experienceDescription, setExperienceDescription] = useState();

  useEffect(() => {
    if (creatorFeedback && creatorFeedback.experience) {
      setExperienceDescription(creatorFeedback.experience.description);
      setExperienceRating(creatorFeedback.experience.rating);
    }
  }, [creatorFeedback]);

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
        disabled={viewFeedback}
        defaultValue={
          viewFeedback && viewFeedback.experience
            ? viewFeedback.experience.description
            : experienceDescription
        }
        classes={{ root: classes.feedbackText }}
      />
      <div>
        <NextPage
          feedbackValue={experience}
          viewFeedback={viewFeedback}
          changeCreatorFeedback={changeCreatorFeedback}
        />
      </div>
    </>
  );
}
