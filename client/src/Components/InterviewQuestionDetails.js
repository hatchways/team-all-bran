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
            <p className={classes.questionTopicText}>Diagonal Difference</p>
            <p className={classes.questionDescText}>
              Given a square matrix, calculate the absolute difference between
              the sums of its diagonals. For example, the square matrix arr is show below.
        </p>
            <p className={classes.funcDescText}>Function Description</p>
            <p className={classes.questionDescText}>
              Complete the function in the diagonalOfDifference editor below. It must return an
              integer representing the absolute diagonal difference. diagonalDifference takes in the follow parameter: arr: an array of integers.
        </p>
          </div>
        </>
        : <div className={classes.answerSolutionContainer}>
          Answer
        </div>}
    </div>
  )
}

export default InterviewQuestionDetails
