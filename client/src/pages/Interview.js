import React, { useContext, useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import Grid from '@material-ui/core/Grid';
import InterviewQuestionDetails from '../components/InterviewQuestionDetails';
import TextEditor from '../components/TextEditor';
import InterviewHeader from '../components/InterviewHeader';
import OutputConsole from '../components/OutputConsole';
import axios from 'axios';
import { getInterview, getQuestion } from '../utils/apiFunctions';
import { useHistory } from 'react-router';
import SocketContext from '../context/socket';

const Interview = ({ userData }) => {
  const classes = useStyles();
  const history = useHistory();
  const roomId = history.location.pathname.split('/')[2];
  const socket = useContext(SocketContext);
  const handleCodeSnippetChange = (codeSnippet) => {
    setCode(codeSnippet);
  };
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [codeResult, setCodeResult] = useState('');
  const [pageData, setPageData] = useState({
    isLoaded: false,
    questions: {
      questionOne: null,
      questionTwo: null,
    },
  });
  const fetchQuestions = async () => {
    try {
      const { data } = await getInterview(roomId);
      const { interview: userData } = data;
      const { users: interviewUsers } = userData;
      const questions = [];

      for (let user of interviewUsers) {
        const questionId = user.question;
        const question = await getQuestion(questionId).then((res) => res.data);
        questions.push(question);
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
  };
  const runCode = async () => {
    try {
      const result = await axios.post(`/runCode`, { language, code });
      setCodeResult(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  useEffect(() => {
    socket.emit('change_text', code);
  }, [code, socket]);

  useEffect(() => {
    socket.on('new_content', (data) => setValue(data));
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    socket.emit('code_result', codeResult);
  }, [codeResult, socket]);

  useEffect(() => {
    socket.on('result_code', (data) => {
      setCodeResult(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit('change_language', language);
  }, [language, socket]);

  useEffect(() => {
    socket.on('language_change', (data) => {
      setLanguage(data);
    });
  }, [socket]);

  return (
    <div className={classes.interviewContainer}>
      <Grid className={classes.gridSpacingThree} container spacing={3}>
        <InterviewHeader
          language={language}
          userData={userData}
          setLanguage={handleLanguageChange}
        />
        <Grid className={classes.interviewDetailsContainer} item xs={4}>
          {pageData.isLoaded ? (
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
