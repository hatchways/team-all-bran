import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../themes/theme';

const LanguageSelectMenu = (props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes[`form-dropdown`]} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.language}
        onChange={props.handleLanguageChange}
        label="Language"
      >
        <MenuItem value={'Javascript'}>Javascript</MenuItem>
        <MenuItem value={'Python'}>Python</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LanguageSelectMenu
