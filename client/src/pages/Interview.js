import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useStyles } from '../themes/theme';
import { store } from '../context/store';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import InterviewHeader from '../components/InterviewHeader';
import OutputConsole from '../components/OutputConsole';
import axios from 'axios';
import { useParams } from 'react-router';

const Interview = () => {
  const classes = useStyles();

  const { id } = useParams();

  const { state } = useContext(store);
  const { socket } = state;
  const handleCodeSnippetChange = (codeSnippet) => {
    setCode(codeSnippet);
  };
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [codeResult, setCodeResult] = useState('');

  useEffect(() => {
    socket.emit('create_room', { user: state.user, id });
  }, [socket, state.user, id]);

  useEffect(() => {
    socket.emit('change_text', code);
  }, [code, socket]);

  useEffect(() => {
    socket.on('new_content', (data) => setValue(data));
  }, [socket]);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const runCode = async () => {
    try {
      const result = await axios.post(`/runCode`, { language, code });
      setCodeResult(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.interviewContainer}>
      <Grid className={classes.gridSpacingThree} container spacing={3}>
        <InterviewHeader language={language} setLanguage={handleLanguageChange} />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          <InterviewQuestionDetails />
        </Grid>
        <Grid className={classes.interviewTextEditor} item xs={8}>
          <TextEditor
            value={value}
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
