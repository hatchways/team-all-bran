import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import InterviewHeader from '../components/InterviewHeader';
import OutputConsole from '../components/OutputConsole';
import axios from 'axios';

const Interview = () => {
  const classes = useStyles();

  const [codeData, setCodeData] = useState({
    language: 'javascript',
    code: '//write your code here',
  });

  const [codeResult, setCodeResult] = useState('');

  const handleCodeSnippetChange = (codeSnippet) => {
    setCodeData({ ...codeData, code: codeSnippet });
  };

  const handleLanguageChange = (language) => {
    setCodeData({ ...codeData, language: language });
  };

  const runCode = async () => {
    try {
      const result = await axios.post(`/runCode`, codeData);
      setCodeResult(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { language, code } = codeData;

  return (
    <div className={classes.interviewContainer}>
      <Grid className={classes.gridSpacingThree} container spacing={3}>
        <InterviewHeader language={language} setLanguage={handleLanguageChange} />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          <InterviewQuestionDetails />
        </Grid>
        <Grid className={classes.interviewTextEditor} item xs={8}>
          <TextEditor
            language={language}
            handleCodeSnippetChange={handleCodeSnippetChange}
          />
          <OutputConsole runCode={runCode} codeResult={codeResult} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
