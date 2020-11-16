import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
//import { RedirectPageButton, ContinueButton } from "./Buttons";
import { useStyles } from "../themes/theme";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Rating } from "@material-ui/lab";

const UserInformation = (props) => {
  const classes = useStyles();
  // let language = "";
  // let experience = 0;

  const [userData, setUserData] = useState({
    language: "English",
    experience: 0,
    interviewLevel: 0,
  });

  const onChange = (e) => {
    console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.UserInformation}>
      <h1>Tell about your Backgroud</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.language.value);
          console.log(e.target.experience.value);
          console.log(e.target.interviewLevel.value);
        }}
      >
        <div>Your Language:</div>
        <select name="language">
          <option value="English" label="English"></option>
        </select>

        <div>Years of professional experience:</div>
        <select name="experience">
          <option value={0} label="0"></option>
          <option value={1} label="1"></option>
          <option value={2} label="2"></option>
        </select>

        <div>What is your level at job interviews?</div>

        <Rating
          name="interviewLevel"
          onChange={onChange}
          onChangeActive={(event, newHover) => {
            //setHover(newHover);
            console.log(newHover);
          }}
        />
        <button>Next Step</button>
      </form>
    </div>
  );
};

export default UserInformation;
