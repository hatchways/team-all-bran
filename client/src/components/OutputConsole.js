import React from 'react';
import { CustomButton } from './Buttons';
import { useStyles } from '../themes/theme';

const OutputConsole = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.interviewOutput}>
      <div className={classes.interviewOutputHeader}>
        <div className={classes.consoleText}>Console</div>
        <CustomButton onClick={props.runCode} classField={classes.runCodeButton} text='RUN CODE' />
      </div>
      <div className={classes.outputText}>
        <pre>{props.codeResult}</pre>
      </div>
    </div>
  );
};

export default OutputConsole;
