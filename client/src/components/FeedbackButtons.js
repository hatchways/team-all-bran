import React, { useState } from 'react';
import { FormHelperText } from '@material-ui/core/';
import { useStyles } from '../themes/theme';
import { useHistory, useParams } from 'react-router-dom';
import { NextQuestionButton, PreviousQuestionButton } from './Buttons';
import { createFeedback } from '../utils/apiFunctions';
import { DialogActions } from '@material-ui/core/';

export const NextPage = ({ feedbackValue, viewFeedback, changeCreatorFeedback }) => {
  const { id, pageNumber } = useParams();
  const interviewId = id;
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState(false);
  let errorText;
  let feedbackBody;

  const createUpdateFeedback = async () => {
    //validate correct input
    switch (pageNumber) {
      case '1':
        if (!feedbackValue) {
          setError(true);
          return;
        }
        break;
      case '2':
        const {
          communication,
          codeEfficiency,
          codeOrganization,
          speed,
          debugging,
          problemSolving,
        } = feedbackValue;

        if (
          !(
            communication &&
            codeEfficiency &&
            codeOrganization &&
            speed &&
            debugging &&
            problemSolving
          )
        ) {
          setError(true);
          return;
        }
        break;
      case '3':
      case '4':
      case '5':
      case '6':
        if (!(feedbackValue && feedbackValue.length > 0)) {
          setError(true);
          return;
        }
        break;
      case '7':
        const { rating, description } = feedbackValue;
        if (rating < 1 || !(description && description.length > 0)) {
          setError(true);
          return;
        }
        break;
    }

    try {
      await createFeedback(interviewId, feedbackBody);
    } catch (error) {
      console.error(error);
    }

    if (pageNumber < 7) {
      history.push(`/interview/${interviewId}/feedback/${Number(pageNumber) + 1}`);
    } else {
      history.push(`/dashboard`);
    }
  };

  const nextPage = async (e) => {
    e.preventDefault();
    if (viewFeedback) {
      if (pageNumber < 7) {
        history.push(`/feedback/${viewFeedback._id}/${Number(pageNumber) + 1}`);
      } else {
        history.push(`/dashboard`);
      }
    } else {
      createUpdateFeedback();
    }
  };

  switch (pageNumber) {
    case '1':
      errorText = 'Please select a rating';
      feedbackBody = { performanceLevel: feedbackValue };
      break;
    case '2':
      errorText = 'Please select a rating from all categories';
      feedbackBody = { categories: feedbackValue };
      break;
    case '3':
      errorText = 'Please fill in the field';
      feedbackBody = { strengths: feedbackValue };
      break;
    case '4':
      errorText = 'Please fill in the field';
      feedbackBody = { improvements: feedbackValue };
      break;
    case '5':
      errorText = 'Please fill in the field';
      feedbackBody = { resources: feedbackValue };
      break;
    case '6':
      errorText = 'Please fill in the field';
      feedbackBody = { other: feedbackValue };
      break;
    case '7':
      errorText = 'Please complete all fields';
      feedbackBody = { experience: feedbackValue };
  }

  return (
    <>
      {error ? (
        <FormHelperText classes={{ root: classes.feedbackError }}>
          {errorText}
        </FormHelperText>
      ) : (
        ''
      )}
      <DialogActions classes={{ root: classes.feedbackActions }}>
        {pageNumber > 1 && pageNumber < 7 ? (
          <PrevPage
            pageNumber={pageNumber}
            interviewId={interviewId}
            viewFeedback={viewFeedback}
            changeCreatorFeedback={changeCreatorFeedback}
          />
        ) : (
          ''
        )}
        <NextQuestionButton
          variant='outlined'
          onClick={nextPage}
          color='primary'
          autoFocus
        >
          {pageNumber < 7 ? 'NEXT QUESTION' : !viewFeedback ? 'SUBMIT' : 'DASHBOARD'}
        </NextQuestionButton>
      </DialogActions>
    </>
  );
};

function PrevPage({ pageNumber, interviewId, viewFeedback, changeCreatorFeedback }) {
  const history = useHistory();
  const goBack = async () => {
    if (viewFeedback) {
      history.push(`/feedback/${viewFeedback._id}/${Number(pageNumber) - 1}`);
    } else {
      await changeCreatorFeedback();
      history.push(`/interview/${interviewId}/feedback/${Number(pageNumber) - 1}`);
    }
  };

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
