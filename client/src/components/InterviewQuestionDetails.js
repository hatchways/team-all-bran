import React, { useState } from "react";
import { InterviewDetailButton } from '../components/Buttons'
import { useStyles } from '../themes/theme';

const InterviewQuestionDetails = (props) => {
  const classes = useStyles();

  const [questionAnswerToggle, setQuestionAnswerToggle] = useState({
    answer: true,
    question: false
  });

  const { answer, question } = questionAnswerToggle
  return (
    <div className={classes.interviewDetailsContainer}>
      <div className={classes.questionAnswerButtonContainer}>
        <div onClick={() => setQuestionAnswerToggle({ answer: true, question: false })}>
          <InterviewDetailButton questionAnswerToggle={answer} text="Question" />
        </div>
        <div onClick={() => setQuestionAnswerToggle({ answer: false, question: true })}>
          <InterviewDetailButton questionAnswerToggle={question} text="Answer" />
        </div>
      </div>
      {answer
        ? <>
          <div className={classes.questionDetailsContainer}>
            <p className={classes.questionTopicText}>{props.question.title}</p>
            <p className={classes.questionDescText}>
              {props.question.description}
            </p>
          </div>
        </>
        : <div className={classes.answerSolutionContainer}>
          Answer
        </div>}
    </div>
  );
}

export default InterviewQuestionDetails;
