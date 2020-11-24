import React from 'react';
import { RunCodeButton } from './Buttons';
import { useStyles } from '../themes/theme';

const OutputConsole = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.interviewOutput}>
      <div className={classes.interviewOutputHeader}>
        <div className={classes.consoleText}>Console</div>
        <div onClick={props.runCode}>
          <RunCodeButton text='RUN CODE' />
        </div>
      </div>
      <div className={classes.outputText}>
        <pre>{props.codeResult}</pre>
      </div>
    </div>
  );
};

export default OutputConsole;
