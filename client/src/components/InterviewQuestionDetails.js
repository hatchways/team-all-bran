import React, { useState } from "react";
import { InterviewDetailButton } from '../components/Buttons'
import { useStyles } from '../themes/theme';

const InterviewQuestionDetails = (props) => {
  const classes = useStyles();

  const [questionAnswerToggle, setQuestionAnswerToggle] = useState({
    answer: true,
    question: false
  });

  const parsedQuestionDescription = () => {
    let mainDescriptionParsed = false;
    let lines = props.question.description.split('\n');
    let lineCount = lines.length;
    let codeBlockTexts = [];
    return (
      lines.map((line, index) => {
        if (mainDescriptionWasParsed(line, index, lineCount)) {
          mainDescriptionParsed = true;
          const codeDiv = (
            <>
              {codeBlockTexts.length > 0 ?
                <div key={index} className={classes.questionDescCodeBlock}>
                  {codeBlockTexts.map((text, index) => {
                    return <p key={index}>{text}</p>
                  })}
                </div>
                : <></>}
              {line.startsWith("Example ") ? <p key={index} className={classes.questionDescExampleText}>{line}</p> : <></>}
            </>
          )
          codeBlockTexts = [];
          return codeDiv;
        } else if (!mainDescriptionParsed) {
          if (line.length !== 0) {
            return <p key={index} className={classes.questionDescText}>{line}</p>
          }
          return <></>
        } else {
          codeBlockTexts.push(line);
        }
      })
    );
  }

  const mainDescriptionWasParsed = (line, index, lineCount) => {
    return (line.startsWith("Example") || line.startsWith("Constraints:") || index === lineCount - 1)
  }

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
            {parsedQuestionDescription()}
          </div>
        </>
        : <div className={classes.answerSolutionContainer}>
          Answer
        </div>}
    </div>
  );
}

export default InterviewQuestionDetails;
