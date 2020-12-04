import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
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
import { store } from '../context/store';
import Peer from "simple-peer";

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
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    socket.emit('create_interview', { user: state.user, roomId });
  }, [socket, state.user, roomId]);

  useEffect(() => {
    socket.on('user_left', ({ roomId }) => {
      console.log(`user left the room! ${roomId}`);
    });

    return () => {
      socket.emit('leave_interview', { roomId });
    };
  }, [socket]);

  useEffect(() => {
    socket.emit('change_text', { code, roomId });
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
      if (data.interview.code !== '') {
        setValue(data.interview.code);
      }

      data.interview.users.forEach(({ user }) => {
        if (user._id !== state.user._id) setPartner(user);
      });

      const { interview: userData } = data;
      const { users: interviewUsers } = userData;
      const questions = [];

      for (let i = 0; i < 2; i++) {
        const user = interviewUsers[i];
        const questionId = user.question._id;
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
  }, [roomId, state.user._id]);

  useEffect(() => {
    fetchInterview();
  }, [fetchInterview]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
    })

    socket.on("start_call", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })

    socket.on("end_call", () => {
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = null;
      }
      socket.removeAllListeners("call_accepted");

      setCallAccepted(false);
      setCallerSignal(null);
    });

    return () => {
      socket.emit("end_call", { roomId });
    }
  }, []);

  window.onbeforeunload = () => {
    socket.emit("end_call", { roomId });
  };

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

  if (callAccepted) {
    if (userVideo.current && !userVideo.current.srcObject) {
      userVideo.current.srcObject = stream;
    }
  }

  const acceptCall = () => {
    setCallAccepted(true);
    setReceivingCall(false);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("accept_call", { signal: data, to: caller });
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on('error', err => {
      console.error(err);
    })

    peer.signal(callerSignal);
  }

  const endCall = () => {
    socket.emit("end_call", { roomId });
  }

  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
        ]
      },
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit(
        "call_user",
        {
          roomId: roomId,
          userToCall: id,
          signalData: data,
          from: state.user._id
        });
    });

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    peer.on('error', err => {
      console.error(err);
    })

    socket.on("call_accepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
  }

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
          callPeer={() => callPeer(partner._id)}
          endCall={endCall}
          callAccepted={callAccepted}
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
            userVideo={userVideo}
            receivingCall={receivingCall}
            handleAcceptCall={acceptCall}
            partnerVideo={partnerVideo}
            partnerName={`${partner.firstName} ${partner.lastName}`}
          />
          <OutputConsole runCode={runCode} codeResult={codeResult} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Interview;
