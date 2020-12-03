import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import { CustomButton } from './Buttons';
import { generateKey } from '../utils/generateRandomKey';
import { Dialog, DialogContent } from '@material-ui/core/';
import { useHistory, useParams } from 'react-router';
import { getQuestionInterview } from '../utils/apiFunctions';

const QuestionDialog = () => {
  const [openQuestion, setOpen] = useState(true);
  const [question, setQuestion] = useState();
  const classes = useStyles();
  const history = useHistory();
  const { questionId, interviewId } = useParams();

  useEffect(() => {
    async function setUserQuestion() {
      try {
        const question = await getQuestionInterview(questionId, interviewId);
        setQuestion(question.data);
      } catch (error) {
        console.error(error);
        setQuestion({ error: 'could not find question' });
      }
    }

    setUserQuestion();
  }, []);

  const parsedQuestionDescription = (question) => {
    let mainDescriptionParsed = false;
    const lines = question.description.split('\n');
    const lineCount = lines.length;
    let codeBlockTexts = [];
    return lines.map((line, index) => {
      if (mainDescriptionWasParsed(line, index, lineCount)) {
        mainDescriptionParsed = true;
        const codeDiv = (
          <>
            {codeBlockTexts.length > 0 ? (
              <div className={classes.questionDescCodeBlock}>
                {codeBlockTexts.map((text) => {
                  return <p key={generateKey()}>{text}</p>;
                })}
              </div>
            ) : (
              <div key={generateKey()}></div>
            )}
            {line.startsWith('Example ') ? (
              <p className={classes.questionDescExampleText}>{line}</p>
            ) : (
              <></>
            )}
          </>
        );
        codeBlockTexts = [];
        return codeDiv;
      } else if (!mainDescriptionParsed) {
        if (line.length !== 0) {
          return <p className={classes.questionDescText}>{line}</p>;
        }
        return <></>;
      } else {
        codeBlockTexts.push(line);
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/dashboard');
  };

  const mainDescriptionWasParsed = (line, index, lineCount) => {
    return (
      line.startsWith('Example') ||
      line.startsWith('Constraints:') ||
      index === lineCount - 1
    );
  };

  if (question && question.error) {
    return <div></div>;
  }

  return (
    <Dialog
      open={openQuestion}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='lg'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {question && (
        <div className={classes.questionDetailsContainer}>
          <p className={classes.questionTopicText}>{question.title}</p>
          <DialogContent>
            {parsedQuestionDescription(question)}
            <div className={classes.answerButtonContainer}>
              <CustomButton
                onClick={() => window.open(`${question.url}/discuss`, '_blank')}
                classField={classes.answerButton}
                text='View Answer'
              />
            </div>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
};

export default QuestionDialog;
