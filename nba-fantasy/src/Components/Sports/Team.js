import React, { useState } from 'react';
import {TeamWrapper} from './TeamWrapper'
import { useDispatch, useSelector } from 'react-redux';
import { setValue1 } from '../../actions'; 


export {TeamWrapper};
export const Team = ({addTeam}) => {
  const dispatch = useDispatch();

  const value1 = useSelector(state => state.value1);


  const handleSubmit = e => {
    e.preventDefault();
    addTeam(value1);
    dispatch(setValue1(""))
  }

return (
  <>
  <form className="Team" onSubmit={handleSubmit}>
      <input type="text" className='todo-input' value={value1}
      placeholder="What Player Do You Want To Add?"
      onChange={(e) => dispatch(setValue1(e.target.value))}/>
      <button type ='submit' className = 'todo-btn'>Add Player</button> 
      </form>
  </>

  );
};

export default Team;