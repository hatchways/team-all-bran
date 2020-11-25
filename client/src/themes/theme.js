import { createMuiTheme } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Helvetica"',
    fontSize: 14,
    h1: {
      // could customize the h1 variant as well
    },
  },
  palette: {
    primary: { main: '#516BF6' },
  },
});

export const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      length: '400ch',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '30px',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.darkBlue,
    },
    '& .MuiOutlinedInput-input': {
      color: 'black',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiInputLabel-outlined': {
      color: 'gray',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'gray',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: colors.darkBlue,
    },
  },
  [`form-dropdown`]: {
    minWidth: 120,
    marginRight: 30,
    '& .MuiOutlinedInput-root.Mui .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined': {
      color: 'white',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'white',
    },
  },
  gridSpacingThree: {
    height: '93vh',
    width: '100%',
    margin: 0,
  },
  signUpForm: {
    marginLeft: '40px',
    display: 'flex',
    width: '30%',
  },
  loginImage: {
    float: 'left',
    paddingRight: '40px',
  },
  loginInSignUpContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  getStarted: {
    color: '#484848',
    marginLeft: '10px',
  },
  loginContainer: {
    width: 'inherit',
    top: '0',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  alreadyHaveAccount: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontStyle: 'italic',
  },
  loginSignupWrapperRoot: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Roboto',
    color: colors.charcoalGray,
  },
  loginSignupWrapperRoot: {
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
    position: 'relative',
  },
  formField: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pastPracticesText: {
    fontSize: '40px',
    color: colors.darkBlue,
  },
  interviewTable: {
    width: 1000,
    margin: 'auto',
    borderWidth: 1,
    borderColor: 'black',
  },
  interviewTableHeader: {
    backgroundColor: colors.darkBlue,
  },
  headerFont: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoFormDiv: {
    marginBottom: '2px',
    fontWeight: '600',
    //color: `${colors.darkGray}`,
    color: 'rgba(94, 94, 94)',
  },
  infoDropdown: {
    marginRight: '10px',
    marginBottom: '20px',
    paddingLeft: '16px',
    paddingBottom: '8px',
    paddingTop: '8px',
    borderRadius: '5px',
    border: `1px solid ${colors.lightGray}`,
    width: '100%',
    height: '40px',
  },
  starRating: {
    marginTop: '5px',
    marginBottom: '7px',
  },
  interviewLevelDiv: {
    color: `${colors.darkBlue}`,
    fontWeight: 'Bold',
  },
  interviewLevelDesc: {
    color: `${colors.darkGray}`,
    marginBottom: '30px',
  },
  interviewContainer: {
    overflow: 'hidden',
    height: '100%',
    width: '100vw',
    position: 'relative',
  },
  interviewHeader: {
    backgroundColor: colors.darkBlue,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '10vh',
    alignItems: 'center',
  },
  interviewDetailsContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  interviewTextEditor: {
    backgroundColor: 'rgba(30,30,30, 1)',
    height: '100vh',
  },
  interviewOutput: {
    backgroundColor: colors.darkGraySolid,
    bottom: '0',
    position: 'absolute',
    height: '20vh',
    width: '66%',
    marginBottom: '25px',
    borderRadius: '10px',
  },
  interviewOutputHeader: {
    backgroundColor: colors.lightGraySolid,
    width: '100%',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    height: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMarginRight: {
    marginRight: '10px',
  },
  interviewWithText: {
    marginLeft: '40px',
    color: 'white',
    fontSize: '30px',
  },
  backgroundContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(67, 67, 125)`,
  },
  background: {
    width: '50%',
    height: '80%',
    backgroundColor: `white`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: "center",
  },
  backgroundHeader: {
    color: `${colors.darkBlue}`,
    fontSize: '25px',
    fontWeight: '600',
    width: '50%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  backgroundForm: {
    width: '50%',
    //height: "30%",
    display: 'flex',
    flexDirection: 'column',
  },
  questionDetailsContainer: {
    marginTop: '30px',
    textAlign: 'left',
    width: '100%',
    height: '72vh',
    overflow: 'scroll',
  },
  questionTopicText: {
    color: colors.darkBlue,
    fontSize: '35px',
    marginBottom: '40px',
    textAlign: 'center'
  },
  funcDescText: {
    fontWeight: 'bold',
    fontSize: '25px',
  },
  questionDescText: {
    color: 'gray',
    fontSize: '18px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  questionDescExampleText: {
    color: colors.darkBlue,
    fontWeight: 'bold',
    fontSize: '20px',
    padding: '20px'
  },
  questionDescCodeBlock: {
    padding: '20px',
    color: 'black',
    backgroundColor: colors.lighterGray,
    fontSize: '18px',
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
    padding: '20px',
    width: '85%'
  },
  answerSolutionContainer: {
    marginTop: '30px',
  },
  questionAnswerButtonHighlighted: {
    borderRadius: 35,
    height: 50,
    width: 180,
    padding: '18px 36px',
    fontSize: '15px',
    color: colors.darkBlue,
    marginRight: '15px',
    boxShadow: `0 1px 5px 2px ${colors.shadow}`,
    fontWeight: 'bold'
  },
  questionAnswerButtonUnhighlighted: {
    borderRadius: 35,
    height: 50,
    width: 180,
    padding: '18px 36px',
    fontSize: '15px',
    color: colors.charcoalGray,
    marginRight: '15px',
    boxShadow: `0 1px 5px 2px ${colors.shadow}`,
  },
  questionAnswerButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '20px',
  },
  runCodeButton: {
    color: 'white',
    borderColor: colors.lightGray,
    borderRadius: 25,
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
    borderWidth: 4,
    padding: '2px 20px',
  },
  exitInterviewButton: {
    color: 'white',
    borderColor: colors.lightGray,
    borderRadius: 25,
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
    borderWidth: 2,
    padding: '2px 20px',
  },
  consoleText: {
    color: 'white',
    marginLeft: '20px',
    fontSize: '25px',
  },
  outputText: {
    color: 'white',
    marginTop: '15px',
    paddingLeft: '20px',
    fontFamily: 'monospace',
    fontSize: '18px',
  },
  languageExitInterviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
  },
  languageDropdownContainer: {
    marginRight: '25px',
    color: 'white',
  },
  languageDropDown: {
    color: 'white',
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-around`,
    marginRight: `45px`,
  },
  navBarContainer: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    color: `black`,
  },
  linkTextSelected: {
    textDecoration: `none`,
    color: `#516BF6`,
    fontWeight: `bold`,
  },
  nameAvatar: {
    display: `flex`,
    justifyContent: `space-around`,
  },
  userNameDiv: {
    fontSize: `16px`,
    color: `black`,
    marginLeft: `10px`,
  },
  createInterviewDialog: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-around`,
    alignItems: `center`,
    padding: `45px`,
  },
  waitingRoomDialogue: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignContent: `left`,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 450,
    minHeight: 100,
  },
  formControlWaitingRoom: {
    margin: theme.spacing(1),
    minWidth: 500,
    minHeight: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  answerButton: {
    color: colors.darkBlue,
    borderColor: colors.lightGray,
    borderRadius: 5,
    marginTop: '10px',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
    borderWidth: 2,
    padding: '2px 20px'
  },
  answerButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export const GlobalCss = withStyles({
  '@global': {
    body: {
      height: '100vh',
    },
    '#root': {
      height: '100%',
    },
    header: {
      display: 'none',
    },
    '.MuiAppBar-root': {
      display: 'none',
    },
  },
})(() => null);

export const colors = {
  darkBlue: '#516BF6',
  lightBlue: 'rgba(73, 145, 203, .8)',
  darkGray: 'rgba(105, 105, 105, .8)',
  lightGray: 'rgba(169, 169, 169, .8)',
  shadow: 'rgba(125, 123, 135, .3)',
  charcoalGray: 'rgba(30,30,30, .8)',
  darkGraySolid: 'rgba(105, 105, 105, 1)',
  lightGraySolid: 'rgba(76, 76, 76, 1)',
  lighterGray: 'rgba(247, 249, 250, 1)',
};
