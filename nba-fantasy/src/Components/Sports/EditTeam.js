// import React, { useState } from 'react';

// export const EditTeam = ({editTeam, task}) => {
//   const [value, setValue] = useState(task.task);

//   const handleSubmit = e => {
//     e.preventDefault();
//     editTeam(value,task.id);
    
//   }

// return (
//     <form className="Team" onSubmit={handleSubmit}>
//       <input type="text" className='todo-input' value={value}
//       placeholder="Update the players?"
//       onChange={(e) => setValue(e.target.value)}/>
//       <button type ='submit' className = 'todo-btn'>Update Player</button> 
//     </form>
//   );
// };

// export default EditTeam;