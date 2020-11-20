import React, { useState } from 'react';
import { RunCodeButton } from './Buttons';
import { useStyles } from '../themes/theme';
import axios from 'axios';

const OutputConsole = (props) => {
  const classes = useStyles();
  const [output, setOutput] = useState('');

  // const runCode = async () => {
  //   let codeData = { language: props.language, code: props.codeSnippet };
  //   console.log(`${codeData.code}`);

  //   try {
  //     const result = await axios.get(`http://localhost:3000/runCode`, codeData);
  //     console.log('testing');
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error('error');
  //   }
  //   //setOutput(output);
  // };

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
