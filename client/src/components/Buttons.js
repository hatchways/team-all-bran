import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import { colors } from "../themes/theme"
import React from "react"
import { useStyles } from "../themes/theme"

export const ContinueButton = withStyles({
  root: {
    background: colors.darkBlue,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(125, 123, 135, .3)",
    marginLeft: "10px",
    borderRadius: 25,
  },
})(Button)

export const RedirectPageButton = withStyles({
  root: {
    color: colors.darkGray,
    height: "5ch",
    padding: "0 30px",
    marginLeft: "10px",
    borderRadius: 25,
  },
})(Button)

export const StartDashboardButton = withStyles({
  root: {
    borderRadius: 35,
    height: 40,
    width: 100,
    backgroundColor: colors.darkBlue,
    padding: "18px 36px",
    fontSize: "18px",
    color: "white",
    marginTop: "30px",
  },
})(Button)

export const NextStepButton = withStyles({
  root: {
    borderRadius: 35,
    height: 48,
    backgroundColor: colors.darkBlue,
    padding: "0 30px",
    width: "150px",
    color: "white",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
})(Button)

export const InterviewDetailButton = (props) => {
  const classes = useStyles()
  const { text, questionAnswerToggle } = props
  return (
    <Button
      className={
        questionAnswerToggle
          ? classes.questionAnswerButtonHighlighted
          : classes.questionAnswerButtonUnhighlighted
      }
    >
      {text}
    </Button>
  )
}
