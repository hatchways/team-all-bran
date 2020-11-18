import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails'
import TextEditor from '../components/TextEditor'
import { RunCodeButton } from '../components/Buttons';
import { useHistory } from 'react-router-dom'
import InterviewHeader from '../components/InterviewHeader'

const Interview = () => {
  const classes = useStyles();
  const [codeSnippet, setCodeSnippet] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState('javascript');

  const runCode = (output) => {
    setOutput(output)
  }

  const handleCodeSnippetChange = (codeSnippet) => {
    setCodeSnippet(codeSnippet)
  }

  return (
    <div className={classes.interviewContainer}>
      <Grid container spacing={3}>
        <InterviewHeader language={language} setLanguage={setLanguage} />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          <InterviewQuestionDetails />
        </Grid>
        <Grid className={classes.interviewTextEditor} item xs={8}>
          <TextEditor language={language} handleCodeSnippetChange={handleCodeSnippetChange} />
          <div className={classes.interviewOutput}>
            <div className={classes.interviewOutputHeader}>
              <div className={classes.consoleText}>Console</div>
              <div onClick={() => runCode('hello')}>
                <RunCodeButton text="RUN CODE" />
              </div>
            </div>
            <div className={classes.outputText}>
              {output}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
