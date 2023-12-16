import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const TeamDisplay = ({task,deletePlayer,editTeam}) => {
  return (
    <>
    <div className='TeamDisplay'>
      <p>{task.task}</p> {/* Assuming task is an object with a task property */}
      <div>
        <FontAwesomeIcon icon={faPenSquare} onClick={() => editTeam(task.id)}/>
        <FontAwesomeIcon icon={faTrash} onClick={() => deletePlayer(task.id)}/>
      </div>
    </div>
    </>
  );
};

export default TeamDisplay;
