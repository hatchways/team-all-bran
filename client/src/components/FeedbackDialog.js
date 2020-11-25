import React, { useState } from 'react';
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
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core/';
import { useParams, useHistory } from 'react-router-dom';

const FeedbackDialog = (props) => {
  const [open, setOpen] = useState(props.open);
  const { pageNumber } = useParams();
  const history = useHistory();

  const nextPage = () => {
    if (pageNumber === '6') {
      history.push('/dashboard');
    } else {
      history.push(`/interview/feedback/${String(Number(pageNumber) + 1)}`);
    }

    //setOpen(false);
  };

  const prevPage = () => {
    history.push(`/interview/feedback/${String(Number(pageNumber) - 1)}`);

    //setOpen(false);
  };

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
        'Any recommendations on resources that can help the cadidate improve?';
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
      open={true}
      onClose={'handleClose'}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Give us your Feedback'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`Question ${questionNumber}/6`}
        </DialogContentText>
        <DialogContentText id='alert-dialog-description'>
          {question}
        </DialogContentText>

        <FormControl>{formContent}</FormControl>
      </DialogContent>
      <DialogActions>
        {pageNumber > 1 ? (
          <Button onClick={prevPage} color='primary' autoFocus>
            PREVIOUS QUESTION
          </Button>
        ) : (
          ''
        )}
        <Button onClick={nextPage} color='primary' autoFocus>
          NEXT QUESTION
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function FormOne() {
  const ratingValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <>
      <FormLabel>Terrible</FormLabel>
      <RadioGroup row aria-label='rating' name='rating'>
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
      <FormLabel>Perfect</FormLabel>
    </>
  );
}

function FormTwo() {
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
      <div>
        {categories.map((category, index) => {
          return <div key={index}>{category}</div>;
        })}
      </div>
      <div>
        <div>
          {categoryValues.map((category, index) => {
            return <div key={index}>{category}</div>;
          })}
        </div>
        {categories.map((category, index) => {
          return (
            <RadioGroup key={index} row aria-label={category} name={category}>
              {categoryScore.map((score, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={score}
                    control={<Radio color='primary' />}
                  />
                );
              })}
            </RadioGroup>
          );
        })}
      </div>
    </>
  );
}

function FormThree() {
  return <TextField label='Your answer...' variant='outlined' />;
}

function FormFour() {
  return <TextField label='Your answer...' variant='outlined' />;
}

function FormFive() {
  return <TextField label='Your answer...' variant='outlined' />;
}

function FormSix() {
  return <TextField label='Your answer...' variant='outlined' />;
}

export default FeedbackDialog;
