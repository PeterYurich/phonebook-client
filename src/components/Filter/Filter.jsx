import React from 'react';
import { setFilter } from 'redux/contacts/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { TextField } from '@mui/material';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const onChange = evt => {
    dispatch(setFilter(evt.target.value.trim()));
  };

  return (
    <div
    // sx={{
    //   marginTop: 8,
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // }}
    >
      <TextField
        label="Filter by name"
        margin="normal"
        type="filter"
        name="filter"
        onChange={onChange}
        value={filter}
      ></TextField>
    </div>
  );
};

export default Filter;
