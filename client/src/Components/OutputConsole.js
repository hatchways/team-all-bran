import React, { useState } from 'react';
import { RunCodeButton } from './Buttons';
import { useStyles } from '../themes/theme';

const OutputConsole = (props) => {
  const classes = useStyles();
  const [output, setOutput] = useState('');

  const runCode = (output) => {
    setOutput(output);
  }

  return (
    <div className={classes.interviewOutput}>
      <div className={classes.interviewOutputHeader}>
        <div className={classes.consoleText}>Console</div>
        <div onClick={() => runCode('hello')}>
          <RunCodeButton text="RUN CODE" />
        </div>
      </div>
      <div className={classes.outputText}>
        {output}
      </div>
    </div>
  )
}

export default OutputConsole;
