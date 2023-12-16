import React, { useState } from 'react';
import {TeamWrapper} from './TeamWrapper'

export {TeamWrapper};
export const Team = ({addTeam}) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addTeam(value);
    setValue("")
  }

return (
    <form className="Team" onSubmit={handleSubmit}>
      <input type="text" className='todo-input' value={value}
      placeholder="What Player Do You Want To Add?"
      onChange={(e) => setValue(e.target.value)}/>
      <button type ='submit' className = 'todo-btn'>Add Player</button> 
    </form>
  );
};

export default Team;