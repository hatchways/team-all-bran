import React, { Fragment, useState } from 'react';
import { useStyles } from '../themes/theme';
import { CustomButton, InterviewDetailButton } from './Buttons';
import { generateKey } from '../utils/generateRandomKey';

const InterviewQuestionDetails = ({ questions }) => {
  const classes = useStyles();
  const [questionHighlightToggle, setQuestionHighlightToggle] = useState({
    questionOne: true,
    questionTwo: false,
  });
  const questionSet = [...Object.values(questions)];
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
          <Fragment key={index}>
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
              <p key={index} className={classes.questionDescExampleText}>
                {line}
              </p>
            ) : (
                <Fragment key={index}></Fragment>
              )}
          </Fragment>
        );
        codeBlockTexts = [];
        return codeDiv;
      } else if (!mainDescriptionParsed) {
        if (line.length !== 0) {
          return (
            <p key={index} className={classes.questionDescText}>
              {line}
            </p>
          );
        }
        return <Fragment key={index}></Fragment>;
      } else {
        codeBlockTexts.push(line);
      }
    });
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
    <div className={classes.interviewDetailsContainer}>
      <div className={classes.questionAnswerButtonContainer}>
        <div
          onClick={() => {
            setQuestionHighlightToggle({ questionOne: true, questionTwo: false });
            setQuestionDisplayed(0);
          }}
        >
          <InterviewDetailButton
            questionAnswerToggle={questionOne}
            text='Question #1'
          />
        </div>
        <div
          onClick={() => {
            setQuestionHighlightToggle({ questionOne: false, questionTwo: true });
            setQuestionDisplayed(1);
          }}
        >
          <InterviewDetailButton
            questionAnswerToggle={questionTwo}
            text='Question #2'
          />
        </div>
      </div>
      <div className={classes.questionDetailsContainer}>
        <p className={classes.questionTopicText}>
          {questionSet[questionDisplayed].title}
        </p>
        {parsedQuestionDescription(questionSet[questionDisplayed])}
        <div className={classes.answerButtonContainer}>
          <CustomButton
            onClick={() =>
              window.open(`${questionSet[questionDisplayed].url}/discuss`, '_blank')
            }
            classField={classes.answerButton}
            text='View Answer'
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionDetails;
