import React, { useState } from 'react';
import { useStyles } from '../themes/theme';
import { Computer, ExpandMore } from '@material-ui/icons';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField
} from '@material-ui/core';
import { faqData } from '../utils/faqData';

const Faq = () => {
  const classes = useStyles();
  const [expandedSet, setExpandedSet] = useState(new Set());
  const [searchList, setSearchList] = useState(faqData);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filterSearchResults = (event) => {
    if (event.key === "Enter") {
      const filteredSearchResults = [];
      const filterSearchTerm = searchTerm.toLowerCase();
      for (const faq of faqData) {
        const question = faq.question.split(' ').map(word => word = word.toLowerCase());
        const answer = faq.answer.split(' ').map(word => word = word.toLowerCase());
        const wordsToFilter = question.join(" ") + answer.join(" ");

        if (wordsToFilter.includes(filterSearchTerm)) {
          filteredSearchResults.push(faq)
        }
      }
      if (filteredSearchResults.length > 0) {
        setSearchList(filteredSearchResults);
      } else {
        setSearchList(faqData)
      }
    }
  }

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;

    setSearchTerm(searchTerm)
    if (!searchTerm) {
      setSearchList(faqData)
    }
  }

  return <div>
    <div className={classes.faqHeaderBar}>
      <div className={classes.faqHeaderTextIconContainer}>
        <Computer className={classes.faqIcon} />
        <Typography className={classes.faqHeaderText}>Mock Interview Platform</Typography>
      </div>
    </div>
    <div className={classes.faqSearchbarContainer}>
      <Typography>How may we help you?</Typography>
      <div className={classes.faqSearchBarAndButton}>
        <TextField
          required
          placeholder="What would you like to search?"
          className={classes.faqSearchbar}
          InputProps={{
            disableUnderline: true,
          }}
          onKeyPress={filterSearchResults}
          onChange={handleSearchChange}
        />
      </div>
      <Typography>You can also browse the topics below to find what you are looking for.</Typography>
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
        {searchList.map((faq, index) => {
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
