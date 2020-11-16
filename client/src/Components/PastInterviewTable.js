import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from '../themes/theme';
import Rating from '@material-ui/lab/Rating';

const PastInterviewTable = () => {
  const createPastInterviewData = (
    name,
    codingRating,
    communcationRating,
    questions,
    detailedFeedback
  ) => {
    return {
      name,
      codingRating,
      communcationRating,
      questions,
      detailedFeedback,
    };
  };

  const pastInterviews = [
    createPastInterviewData(
      { date: 'Thursday, Apr 30, 2020', time: '10:00 AM - 11:00 AM' },
      4.5,
      4.0,
      'View',
      'View'
    ),
    createPastInterviewData(
      { date: 'Wednesday, Mar 18, 2020', time: '2:00 PM - 3:30 PM' },
      3.0,
      4.5,
      'View',
      'View'
    ),
  ];

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.interviewTable} aria-label='simple table'>
        <TableHead className={classes.interviewTableHeader}>
          <TableRow>
            <TableCell className={classes.headerFont}>Held&nbsp;on</TableCell>
            <TableCell className={classes.headerFont} align='right'>
              Coding
            </TableCell>
            <TableCell className={classes.headerFont} align='right'>
              Communication
            </TableCell>
            <TableCell className={classes.headerFont} align='right'>
              Questions
            </TableCell>
            <TableCell className={classes.headerFont} align='right'>
              Detailed&nbsp;feedback
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastInterviews.map((interview, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                <div>{interview.name.date}</div>
                <div>{interview.name.time}</div>
              </TableCell>
              <TableCell align='right'>
                <Rating
                  name='read-only'
                  value={interview.codingRating}
                  readOnly
                />
              </TableCell>
              <TableCell align='right'>
                <Rating
                  name='read-only'
                  value={interview.communcationRating}
                  readOnly
                />
              </TableCell>
              <TableCell align='right'>{interview.questions}</TableCell>
              <TableCell align='right'>{interview.detailedFeedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastInterviewTable;
