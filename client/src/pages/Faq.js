import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import { Computer, ExpandMore } from '@material-ui/icons';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import { faqData } from '../utils/faqData';

const Faq = () => {
  const classes = useStyles();
  const [expandedSet, setExpandedSet] = useState(new Set());

  const handleExpandClick = (panel) => {
    const expandedSetCopy = expandedSet;
    if (expandedSetCopy.has(panel)) {
      expandedSetCopy.delete(panel);
      setExpandedSet(new Set(Array.from(expandedSetCopy)));
    } else {
      expandedSetCopy.add(panel);
      setExpandedSet(new Set(Array.from(expandedSetCopy)));
    }
  }

  return <div>
    <div className={classes.faqHeaderBar}>
      <div className={classes.faqHeaderTextIconContainer}>
        <Computer className={classes.faqIcon} />
        <Typography className={classes.faqHeaderText}>Mock Interview Platform</Typography>
      </div>
    </div>
    <div className={classes.faqMidBarContainer}>
      <div className={classes.faqDoubleMidBarContainer}>
        <div className={classes.faqMidBar} />
        <div className={classes.faqMidBar} />
      </div>
      <Typography className={classes.faqMidBarText}>Frequently Asked Questions (FAQ)</Typography>
      <div className={classes.faqDoubleMidBarContainer}>
        <div className={classes.faqMidBar} />
        <div className={classes.faqMidBar} />
      </div>
    </div>
    <div className={classes.faqAccordionContainer}>
      <div className={classes.faqAccordion}>
        {faqData.map((faq, index) => {
          return (
            <Accordion
              className={expandedSet.has(`panel${index}`) ? classes.faqAccordionItemHighlighted : classes.faqAccordionItem}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`faq-question-${index}`}
                id={`panel${index}a-header`}
                onClick={() => handleExpandClick(`panel${index}`)}
              >
                <Typography className={classes.faqAccordionQuestionText}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.faqAccordionAnswerText}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </div>
  </div>
};

export default Faq;
