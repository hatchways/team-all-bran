import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const LanguageSelectMenu = (props) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Select Language</InputLabel>
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
