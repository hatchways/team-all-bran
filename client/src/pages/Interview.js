import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails'
import TextEditor from '../components/TextEditor'
import InterviewHeader from '../components/InterviewHeader'
import OutputConsole from '../components/OutputConsole'

const Interview = () => {
  const classes = useStyles();
  const [codeSnippet, setCodeSnippet] = useState('')
  const [language, setLanguage] = useState('javascript');

  const handleCodeSnippetChange = (codeSnippet) => {
    setCodeSnippet(codeSnippet)
  }

  return (
    <div className={classes.interviewContainer}>
      <Grid className={classes.gridSpacingThree} container spacing={3}>
        <InterviewHeader language={language} setLanguage={setLanguage} />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          <InterviewQuestionDetails />
        </Grid>
        <Grid className={classes.interviewTextEditor} item xs={8}>
          <TextEditor language={language} handleCodeSnippetChange={handleCodeSnippetChange} />
          <OutputConsole codeSnippet={codeSnippet} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
