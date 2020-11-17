import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { NextStepButton } from "../components/Buttons"
import { useStyles } from "../themes/theme"
import { store } from "../context/store"
import { USER_LOADED } from "../context/types"
import axios from "axios"
import { Rating } from "@material-ui/lab"
import { withStyles } from "@material-ui/core/styles"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

const GlobalCss = withStyles({
  "@global": {
    body: {
      height: "100vh",
    },
    "#root": {
      height: "100%",
    },
    header: {
      display: "none",
    },
    ".MuiAppBar-root": {
      display: "none",
    },
  },
})(() => null)

const InterviewLevelInfo = ({ interviewLevel }) => {
  const classes = useStyles()

  if (interviewLevel < 3) {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Beginner </div>
        <div className={classes.interviewLevelDesc}> New to job interviews</div>
      </>
    )
  } else if (interviewLevel < 5) {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Intermediate </div>
        <div className={classes.interviewLevelDesc}>
          Had a few job interviews but need more practice
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={classes.interviewLevelDiv}>Experienced </div>
        <div className={classes.interviewLevelDesc}>
          Used to job interviews and looking for a challenge
        </div>
      </>
    )
  }
}

const UserInformation = (props) => {
  const classes = useStyles()
  const { dispatch } = useContext(store)
  let a = useContext(store)
  const history = useHistory()

  const [userData, setUserData] = useState({
    language: "English",
    experience: 0,
    interviewLevel: 1,
  })

  const changeRating = (e) => {
    setUserData({ ...userData, interviewLevel: Number(e.target.value) })
  }

  const changeExperience = (e) => {
    setUserData({ ...userData, experience: e.target.value })
  }

  const changeLanguage = (e) => {
    setUserData({ ...userData, language: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const id = props.user._id

    try {
      const result = await axios.put(
        `http://localhost:3001/users/update/${id}`,
        userData
      )
      dispatch({ type: USER_LOADED, payload: result.data.user })

      // will change to /background (protected route, routes folder)
      history.push("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  const { language, experience, interviewLevel } = userData

  return (
    <div className={classes.backgroundContainer}>
      <GlobalCss />
      <div className={classes.background}>
        <h1 className={classes.backgroundHeader}>Tell us about your Background</h1>

        <form className={classes.backgroundForm} id="backgroundForm">
          <div className={classes.infoFormDiv}>Your Language:</div>
          <Select
            className={classes.infoDropdown}
            onChange={changeLanguage}
            value={language}
          >
            <MenuItem value="English">English</MenuItem>
          </Select>

          <div className={classes.infoFormDiv}>
            Years of professional experience:
          </div>
          <Select
            className={classes.infoDropdown}
            onChange={changeExperience}
            value={experience}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10 or more</MenuItem>
          </Select>

          <div className={classes.infoFormDiv}>
            What is your level at job interviews?
          </div>

          <Rating
            name="interviewLevel"
            className={classes.starRating}
            onChange={changeRating}
            size="large"
            defaultValue={1}
          />

          <InterviewLevelInfo interviewLevel={interviewLevel} />
        </form>
        <NextStepButton type="submit" form="backgroundForm" onClick={onSubmit}>
          Next Step
        </NextStepButton>
      </div>
    </div>
  )
}

export default UserInformation
