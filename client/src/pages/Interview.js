import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails'
import TextEditor from '../components/TextEditor'

const Interview = () => {
  const classes = useStyles();

  const [codeSnippet, setCodeSnippet] = useState('')

  const handleCodeSnippetChange = (codeSnippet) => {
    setCodeSnippet(codeSnippet)
  }

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
              <div className={classes.textMarginLeft}>Console</div>
              <div className={classes.textMarginRight}>RUN CODE</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
