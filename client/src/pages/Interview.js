import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import { RunCodeButton } from '../components/Buttons';

const Interview = () => {
  const classes = useStyles();

  const [codeSnippet, setCodeSnippet] = useState('');
  const [output, setOutput] = useState('');

  const runCode = (output) => {
    console.log(codeSnippet);
    setOutput(output);
  };

  const handleCodeSnippetChange = (codeSnippet) => {
    setCodeSnippet(codeSnippet);
  };

  return (
    <div className={classes.interviewContainer}>
      <Grid container spacing={3}>
        <Grid className={classes.interviewHeader} item xs={12}>
          <div className={classes.textMarginLeft}>Interview with</div>
          <div className={classes.textMarginRight}>End Interview</div>
        </Grid>
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          <InterviewQuestionDetails />
        </Grid>
        <Grid className={classes.interviewTextEditor} item xs={8}>
          <TextEditor handleCodeSnippetChange={handleCodeSnippetChange} />
          <div className={classes.interviewOutput}>
            <div className={classes.interviewOutputHeader}>
              <div className={classes.consoleText}>Console</div>
              <div onClick={() => runCode('hello')}>
                <RunCodeButton text='RUN CODE' />
              </div>
            </div>
            <div className={classes.outputText}>{output}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
