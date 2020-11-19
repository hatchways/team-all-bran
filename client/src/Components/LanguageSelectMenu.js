import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../themes/theme';

const LanguageSelectMenu = ({ language, handleLanguageChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes[`form-dropdown`]} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={language}
        onChange={handleLanguageChange}
        label="Language"
      >
        <MenuItem value={'javascript'}>Javascript</MenuItem>
        <MenuItem value={'python'}>Python</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LanguageSelectMenu
