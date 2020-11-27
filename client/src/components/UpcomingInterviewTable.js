import React, { useState, useEffect } from 'react';
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

const UpcomingInterviewTable = ({ interviews }) => {
  const [upcomingInterviews, setUpcomingInterviews] = useState(null);

  useEffect(() => {
    createUpcomingInterviewsTable(interviews)
  }, []);

  const createUpcomingInterviewsTable = (interviews) => {
    const upcomingInterviews = []
    for (const interview of interviews) {
      const created = getStandardTime(interview.createdAt)
      const questionTitle = interview.questionTitle
      const roomId = interview.interviewId
      upcomingInterviews.push({ created, questionTitle, roomId })
    }
    setUpcomingInterviews(upcomingInterviews)
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
                <a className={classes.interviewQuestionTitle}>
                  {interview.questionTitle}
                </a>
              </TableCell>
              <TableCell align='right'>
                <CustomButton classField={classes.interviewActionButton} text="Cancel" />
                <CustomButton
                  onClick={() => history.push({ pathname: `/interview/${interview.roomId}` })}
                  classField={classes.interviewActionButton} text="Join"
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
