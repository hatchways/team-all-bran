import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NextStepButton } from '../components/Buttons';
import { useStyles } from '../themes/theme';
import { store } from '../context/store';
import { USER_LOADED } from '../context/types';
import { Rating } from '@material-ui/lab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { updateUser } from '../utils/apiFunctions';

const experienceList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    setUserData({ ...userData, interviewLevel: Number(e.target.value) });
  };

  const changeExperience = (e) => {
    setUserData({ ...userData, experience: e.target.value });
  };

  const changeLanguage = (e) => {
    setUserData({ ...userData, language: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const id = props.user._id;

    try {
      const result = await updateUser(id, userData);
      dispatch({ type: USER_LOADED, payload: result.data.user });
      history.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const { language, experience, interviewLevel } = userData;

  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.background}>
        <h1 className={classes.backgroundHeader}>Tell us about your Background</h1>

        <form className={classes.backgroundForm} id='backgroundForm'>
          <div className={classes.infoFormDiv}>Your Language:</div>
          <Select
            className={classes.infoDropdown}
            onChange={changeLanguage}
            value={language}
          >
            <MenuItem value='English'>English</MenuItem>
          </Select>

          <div className={classes.infoFormDiv}>
            Years of professional experience:
          </div>
          <Select
            className={classes.infoDropdown}
            onChange={changeExperience}
            value={experience}
          >
            {Array.from(experienceList, (item, idx) => {
              if (item < 10) {
                return (
                  <MenuItem key={idx} value={item}>
                    {item}{' '}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem key={idx} value={item}>
                    10 or more
                  </MenuItem>
                );
              }
            })}
          </Select>

          <div className={classes.infoFormDiv}>
            What is your level at job interviews?
          </div>

          <Rating
            name='interviewLevel'
            className={classes.starRating}
            onChange={changeRating}
            size='large'
            defaultValue={1}
          />
          <InterviewLevelInfo interviewLevel={interviewLevel} />
        </form>
        <NextStepButton type='submit' form='backgroundForm' onClick={onSubmit}>
          Next Step
        </NextStepButton>
      </div>
    </div>
  );
};

export default UserInformation;
