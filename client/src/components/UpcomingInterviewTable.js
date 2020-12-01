import React, { useState, useEffect } from 'react';
import { useStyles } from '../themes/theme';
import { getStandardTime } from '../utils/timeFunctions';
import { CustomButton } from './Buttons';
import { useHistory } from 'react-router';
import { cancelInterview } from '../utils/apiFunctions';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const UpcomingInterviewTable = ({ interviews }) => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  useEffect(() => {
    createUpcomingInterviewsTable(interviews);
  }, []);

  const cancelInterviewById = async (roomId, i) => {
    const res = await cancelInterview(roomId);
    if (res.status === 200) {
      const interviewsCopy = [...upcomingInterviews];
      interviewsCopy.splice(i, 1);
      setUpcomingInterviews(interviewsCopy);
    }
  };

  const createUpcomingInterviewsTable = (interviews) => {
    const upcomingInterviews = [];
    for (const interview of interviews) {
      const created = getStandardTime(interview.createdAt);
      const questionTitle = interview.questionTitle;
      const roomId = interview.interviewId;
      upcomingInterviews.push({ created, questionTitle, roomId });
    }
    setUpcomingInterviews(upcomingInterviews);
  };

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
          {upcomingInterviews &&
            upcomingInterviews.map((interview, i) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row'>
                  <div>{interview.created.date}</div>
                  <div>{interview.created.time}</div>
                </TableCell>
                <TableCell align='center'>
                  {interview.questionTitle ? (
                    <Typography className={classes.interviewQuestionTitle}>
                      {interview.questionTitle}
                    </Typography>
                  ) : (
                    <Typography className={classes.interviewNotStartedText}>
                      (Interview not started)
                    </Typography>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {!interview.questionTitle && (
                    <CustomButton
                      onClick={() => cancelInterviewById(interview.roomId, i)}
                      classField={classes.interviewActionButton}
                      text='Cancel'
                    />
                  )}
                  <CustomButton
                    onClick={
                      interview.questionTitle
                        ? () =>
                            history.push({
                              pathname: `/interview/${interview.roomId}`,
                            })
                        : () =>
                            history.push({ pathname: `/lobby/${interview.roomId}` })
                    }
                    classField={classes.interviewActionButton}
                    text={interview.questionTitle ? 'Join' : 'Lobby'}
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
