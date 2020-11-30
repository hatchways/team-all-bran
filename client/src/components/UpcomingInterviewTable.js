import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from '../themes/theme';
import { getStandardTime } from '../utils/timeFunctions'
import { CustomButton } from './Buttons'
import { useHistory } from 'react-router';
import { cancelInterview } from '../utils/apiFunctions';
import { fetchInterviews } from '../utils/fetchInterviews';
import { store } from '../context/store';
import Typography from '@material-ui/core/Typography';

const UpcomingInterviewTable = ({ interviews }) => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const { state } = useContext(store);

  useEffect(() => {
    createUpcomingInterviewsTable(interviews);
  }, []);

  const cancelInterviewById = async (roomId) => {
    await cancelInterview(roomId);
    const interviews = await fetchInterviews(state.user._id, state.user);
    createUpcomingInterviewsTable(interviews);
  }

  const createUpcomingInterviewsTable = (interviews) => {
    const upcomingInterviews = [];
    for (const interview of interviews) {
      const created = getStandardTime(interview.createdAt);
      const questionTitle = interview.questionTitle;
      const roomId = interview.interviewId;
      upcomingInterviews.push({ created, questionTitle, roomId });
    }
    setUpcomingInterviews(upcomingInterviews);
  }

  const classes = useStyles();
  const history = useHistory();

  return (
    <TableContainer>
      <Table className={classes.interviewTable} aria-label='simple table'>
        <TableHead className={classes.interviewTableHeader}>
          <TableRow>
            <TableCell className={classes.headerFont} align='left'>
              Created
            </TableCell>
            <TableCell className={classes.headerFont} align='center'>
              Your Question
            </TableCell>
            <TableCell className={classes.headerFont} align='center'>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingInterviews && upcomingInterviews.map((interview, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                <div>{interview.created.date}</div>
                <div>{interview.created.time}</div>
              </TableCell>
              <TableCell align='center'>
                {interview.questionTitle ?
                  <Typography className={classes.interviewQuestionTitle}>
                    {interview.questionTitle}
                  </Typography> :
                  <Typography className={classes.interviewNotStartedText}>
                    (Interview not started)
                  </Typography>}
              </TableCell>
              <TableCell align='center'>
                {!interview.questionTitle &&
                  <CustomButton onClick={() => cancelInterviewById(interview.roomId)} classField={classes.interviewActionButton} text="Cancel" />
                }
                <CustomButton
                  onClick={interview.questionTitle ?
                    () => history.push({ pathname: `/interview/${interview.roomId}` }) :
                    () => history.push({ pathname: `/lobby/${interview.roomId}` })}
                  classField={classes.interviewActionButton} text={interview.questionTitle ? "Join" : 'Lobby'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UpcomingInterviewTable;
