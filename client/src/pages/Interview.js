import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useStyles } from '../themes/theme';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import InterviewHeader from '../components/InterviewHeader';
import OutputConsole from '../components/OutputConsole';
import axios from 'axios';
import SocketContext from '../context/socket';
import { getInterview, getQuestion } from '../utils/apiFunctions';
import { useHistory } from 'react-router';
import api from '../utils/api';
import { store } from '../context/store';

const Interview = () => {
  const classes = useStyles();
  const socket = useContext(SocketContext);
  const handleCodeSnippetChange = (codeSnippet) => {
    setCode(codeSnippet);
  };
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [codeResult, setCodeResult] = useState('');
  const [partner, setPartner] = useState([]);
  const { state } = useContext(store);
  const { id: roomId } = useParams();

  useEffect(() => {
    socket.emit('create_interview', { user: state.user, roomId });
  }, []);

  useEffect(() => {
    socket.emit('change_text', code);
  }, [code, socket]);

  useEffect(() => {
    socket.on('new_content', (data) => setValue(data));
  }, [socket]);

  useEffect(() => {
    socket.emit('code_result', codeResult);
  }, [codeResult, socket]);

  const [pageData, setPageData] = useState({
    isLoaded: false,
    questions: {
      questionOne: null,
      questionTwo: null,
    },
  });

  const fetchInterview = useCallback(async () => {
    try {
      const { data } = await getInterview(roomId);
      data.interview.users.forEach(({ user }) => {
        if (user._id !== state.user._id) setPartner(user);
      });

      const { interview: userData } = data;
      const { users: interviewUsers } = userData;
      const questions = [];

      for (let i = 0; i < 2; i++) {
        const user = interviewUsers[i];

        const questionId = user.question;
        const { data } = await getQuestion(questionId);

        questions.push(data.question);
      }
      setPageData({
        isLoaded: true,
        questions: {
          questionOne: questions[0],
          questionTwo: questions[1],
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, [pageData]);

  useEffect(() => {
    fetchInterview();
  }, []);

  useEffect(() => {
    socket.on('result_code', (data) => {
      setCodeResult(data);
    });
  }, [socket]);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  useEffect(() => {
    socket.emit('change_language', language);
  }, [language, socket]);

  useEffect(() => {
    socket.on('language_change', (data) => {
      setLanguage(data);
    });
  }, [socket]);

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
        <InterviewHeader
          partner={partner}
          language={language}
          setLanguage={handleLanguageChange}
        />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          {pageData.questions.questionOne ? (
            <InterviewQuestionDetails questions={pageData.questions} />
          ) : (
            <div>Loading question...</div>
          )}
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
