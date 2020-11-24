import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import InterviewHeader from '../components/InterviewHeader';
import OutputConsole from '../components/OutputConsole';
import { getRandomQuestion } from '../utils/apiFunctions';
import axios from 'axios';

const Interview = (props) => {
  const classes = useStyles();

  const [codeData, setCodeData] = useState({
    language: 'javascript',
    code: '//write your code here',
  });

  const [codeResult, setCodeResult] = useState('');
  const [pageData, setPageData] = useState({ isLoaded: false, question: null })
  const difficulty = props.location.state.difficulty

  const fetchQuestionsByDifficulty = async () => {
    try {
      const { data } = await getRandomQuestion(difficulty)
      setPageData({ isLoaded: true, question: data });
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchQuestionsByDifficulty()
  }, []);


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
          {pageData.isLoaded ? <InterviewQuestionDetails question={pageData.question} /> : <div>Loading question...</div>}
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
