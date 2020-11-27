import React, { useState } from 'react';
import { FormHelperText } from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { useHistory } from 'react-router-dom';
import { NextQuestionButton, PreviousQuestionButton } from './Buttons';
import { createFeedback } from '../utils/apiFunctions';

const interviewId = '5fbfcab4d54a3f7654ae5684'; // For testing purposes. To be changed later to pull from params

export const NextPage = ({
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

export const PrevPage = ({ pageNumber }) => {
  const history = useHistory();
  const goBack = () => {
    history.push(`/interview/feedback/${String(Number(pageNumber) - 1)}`);
  };

  if (pageNumber > 1) {
    return (
      <PreviousQuestionButton
        variant='outlined'
        onClick={goBack}
        color='primary'
        autoFocus
      >
        PREVIOUS QUESTION
      </PreviousQuestionButton>
    );
  }
};
