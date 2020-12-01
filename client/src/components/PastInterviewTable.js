import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from '../themes/theme';
import Rating from '@material-ui/lab/Rating';
import { useHistory, useParams } from 'react-router';
import { getStandardTime } from '../utils/timeFunctions';
import { CustomButton } from './Buttons';
import { getFeedbackReciever } from '../utils/apiFunctions';
import FeedbackDialog from '../components/FeedbackDialog';

const PastInterviewTable = ({ interviews }) => {
  const [pastInterviews, setPastInterviews] = useState(null);

  const { pageNumber } = useParams();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    createPastInterviewsTable(interviews);
  }, []);

  const createPastInterviewsTable = async (interviews) => {
    const pastInterviews = [];
    for (const interview of interviews) {
      const created = getStandardTime(interview.createdAt);
      const { questionId, interviewId } = interview;
      if (interview.endTime) {
        const ended = getStandardTime(interview.endTime);
        let feedback;
        let codingRating;
        let communicationRating;
        try {
          feedback = (await getFeedbackReciever(interviewId)).data.feedback;
        } catch (error) {
          console.error(error);
        }

        if (feedback && feedback.categories) {
          const {
            communication,
            codeEfficiency,
            codeOrganization,
            debugging,
            problemSolving,
          } = feedback.categories;
          codingRating = Math.floor(
            (codeEfficiency + codeOrganization + debugging + problemSolving) / 4
          );
          communicationRating = communication;
        }

        pastInterviews.push({
          created,
          ended,
          questionId,
          interviewId,
          feedback: feedback,
          codingRating,
          communicationRating,
        });
      }
    }
    setPastInterviews(pastInterviews);
  };

  const viewMyFeedback = (feedback) => {
    history.push(`/feedback/${feedback._id}/1`);
  };

  const viewMyQuestion = (questionId, interviewId) => {
    history.push(`/question/${questionId}/${interviewId}`);
  };

  console.log(pastInterviews);

  return (
    <TableContainer>
      <Table className={classes.interviewTable} aria-label='simple table'>
        <TableHead className={classes.interviewTableHeader}>
          <TableRow>
            <TableCell className={classes.headerFont}>Held&nbsp;on</TableCell>
            <TableCell className={classes.headerFont} align='right'>
              Ended at
            </TableCell>
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
          {pastInterviews &&
            pastInterviews.map((interview, i) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row'>
                  <div>{interview.created.date}</div>
                  <div>{interview.created.time}</div>
                </TableCell>
                <TableCell align='right'>
                  <div>{interview.ended.date}</div>
                  <div>{interview.ended.time}</div>
                </TableCell>
                <TableCell align='right'>
                  {interview.feedback && interview.codingRating ? (
                    <Rating
                      name='read-only'
                      value={interview.codingRating}
                      readOnly
                    />
                  ) : (
                    <div>Feedback hasn't been reported yet</div>
                  )}
                </TableCell>
                <TableCell align='right'>
                  {interview.feedback && interview.codingRating ? (
                    <Rating
                      name='read-only'
                      value={interview.communicationRating}
                      readOnly
                    />
                  ) : (
                    <div>Not recieved</div>
                  )}
                </TableCell>
                <TableCell align='right'>
                  {interview.feedback ? (
                    <CustomButton
                      onClick={() =>
                        viewMyQuestion(interview.questionId, interview.interviewId)
                      }
                      classField={classes.interviewActionButton}
                      text='VIEW'
                    />
                  ) : (
                    <div>Not recieved</div>
                  )}
                </TableCell>
                <TableCell align='right'>
                  <CustomButton
                    onClick={() => viewMyFeedback(interview.feedback)}
                    classField={classes.interviewActionButton}
                    text='VIEW'
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastInterviewTable;
