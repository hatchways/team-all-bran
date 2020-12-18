import React from 'react';
import { useStyles } from '../themes/theme';
import { Computer } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const Faq = () => {
  const classes = useStyles();

  return <div>
    <div className={classes.faqHeaderBar}>
      <div className={classes.faqHeaderTextIconContainer}>
        <Computer className={classes.faqIcon} />
        <Typography className={classes.faqHeaderText}>Mock Interview Platform</Typography>
      </div>
    </div>
    <div className={classes.faqMidBarContainer}>
      <div className={classes.faqMidBar} />
      <Typography className={classes.faqMidBarText}>Frequently Asked Questions (FAQ)</Typography>
      <div className={classes.faqMidBar} />
    </div>
  </div>;
};

export default Faq;
