import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../themes/theme';

export default function SimpleSelect({ handleChange, selectedValue }) {
  const classes = useStyles();

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
          Difficulty level
        </InputLabel>
        <Select
          labelId='demo-simple-select-placeholder-label-label'
          id='demo-simple-select-placeholder-label'
          value={selectedValue}
          onChange={handleChange}
          className={classes.selectEmpty}
        >
          {difficulties.map((d, idx) => (
            <MenuItem key={idx} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
