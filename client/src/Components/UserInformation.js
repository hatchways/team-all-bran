import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ContinueButton } from '../components/Buttons';
import { useStyles } from '../themes/theme';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';
import axios from 'axios';
import { Rating } from '@material-ui/lab';

const InterviewLevelInfo = ({ interviewLevel }) => {
  const classes = useStyles();
  if (interviewLevel < 3) {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Beginner </div>
        <div className={classes.interviewLevelDesc}> New to job interviews</div>
      </>
    );
  } else if (interviewLevel < 5) {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Intermediate </div>
        <div className={classes.interviewLevelDesc}>
          Had a few job interviews but need more practice
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Experienced </div>
        <div className={classes.interviewLevelDesc}>
          Used to job interviews and looking for a challenge
        </div>
      </>
    );
  }
};

const UserInformation = (props) => {
  const classes = useStyles();
  const { dispatch } = useContext(store);
  const history = useHistory();

  const [userData, setUserData] = useState({
    language: 'English',
    experience: 0,
    interviewLevel: 1,
  });

  const changeRating = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let formData = { ...props.formData, ...userData };

    try {
      const result = await axios.post(
        'http://localhost:3001/users/register',
        formData
      );
      dispatch({ type: USER_LOADED, payload: result.data.user });

      const token = result.data.token;
      localStorage.setItem(process.env.REACT_APP_USER_DATA, token);
      // will change to /background (protected route, routes folder)
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const { interviewLevel } = userData;

  return (
    <>
      <div className={classes.getStarted}>
        <h1>Tell us about your Backgroud</h1>
      </div>

      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={classes.infoFormDiv}>Your Language:</div>
        <select name='language' className={classes.infoDropdown}>
          <option value='English' label='English'></option>
        </select>

        <div className={classes.infoFormDiv}>Years of professional experience:</div>
        <select name='experience' className={classes.infoDropdown}>
          <option value={0} label='0'></option>
          <option value={1} label='1'></option>
          <option value={2} label='2'></option>
          <option value={3} label='3'></option>
          <option value={4} label='4'></option>
          <option value={5} label='5'></option>
          <option value={6} label='6'></option>
          <option value={7} label='7'></option>
          <option value={8} label='8'></option>
          <option value={9} label='9'></option>
          <option value={10} label='10 or more'></option>
        </select>

        <div className={classes.infoFormDiv}>
          What is your level at job interviews?
        </div>

        <Rating
          className={classes.starRating}
          name='interviewLevel'
          onChange={changeRating}
          size='large'
          defaultValue={1}
        />

        <InterviewLevelInfo interviewLevel={interviewLevel} />
        <ContinueButton onClick={onSubmit}>Register</ContinueButton>
      </form>
    </>
  );
};

export default UserInformation;
