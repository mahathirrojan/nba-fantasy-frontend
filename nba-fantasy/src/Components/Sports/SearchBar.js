import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../actions'; 


const SearchBar = ({ onSearch }) => {

  const dispatch = useDispatch();
  const query = useSelector(state => state.query); 

  

  const handleSearch = () => {
    onSearch(query);
  };

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search players..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;