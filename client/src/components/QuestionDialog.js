import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import { CustomButton, InterviewDetailButton } from './Buttons';
import { generateKey } from '../utils/generateRandomKey';
import { Dialog, DialogContent } from '@material-ui/core/';
import { useHistory, useParams } from 'react-router';
import { getQuestionInterview } from '../utils/apiFunctions';

const QuestionDialog = ({ questiond }) => {
  const [openQuestion, setOpen] = useState(true);
  const [question, setQuestion] = useState();
  const classes = useStyles();
  const history = useHistory();
  const { questionId, interviewId } = useParams();
  //   const question = {
  //     _id: { $oid: '5fc1f068a3c17278807ff21c' },
  //     tags: [],
  //     index: 1,
  //     url: 'https://leetcode.com/problems/two-sum',
  //     title: 'Two Sum',
  //     difficulty: 'Easy',
  //     description:
  //       'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n \n\nExample 1:\n\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nOutput: Because nums[0] + nums[1] == 9, we return [0, 1].\n\n\nExample 2:\n\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\n\nExample 3:\n\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n\n\n \n\nConstraints:\n\n2 <= nums.length <= 103\n-109 <= nums[i] <= 109\n-109 <= target <= 109\nOnly one valid answer exists.',
  //     createdAt: 1606545512,
  //     updatedAt: 1606545512,
  //     __v: 0,
  //   };

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

  const [questionHighlightToggle, setQuestionHighlightToggle] = useState({
    questionOne: true,
    questionTwo: false,
  });

  const questionSet = [question, question];
  const [questionDisplayed, setQuestionDisplayed] = useState(0);

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

  const { questionOne, questionTwo } = questionHighlightToggle;
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
          <p className={classes.questionTopicText}>
            {questionSet[questionDisplayed].title}
          </p>
          <DialogContent>
            {parsedQuestionDescription(questionSet[questionDisplayed])}
            <div className={classes.answerButtonContainer}>
              <CustomButton
                onClick={() =>
                  window.open(
                    `${questionSet[questionDisplayed].url}/discuss`,
                    '_blank'
                  )
                }
                classField={classes.answerButton}
                text='View Answer'
              />
            </div>
          </DialogContent>
        </div>
      )}
      {/* </div> */}
    </Dialog>
  );
};

export default QuestionDialog;
