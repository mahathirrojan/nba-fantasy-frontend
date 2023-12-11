import React, { useState } from 'react';
import { Team } from './Team';
import { v4 as uuidv4 } from 'uuid';
import { TeamDisplay } from './TeamDisplay';
import {EditTeam} from './EditTeam';

uuidv4();

export const TeamWrapper = () => {
  const [teams, setTeam] = useState([])

  const addTeam = (player )=> {
    setTeam([...teams, { id: uuidv4(), task: player, dropped: false, isEditing: false }]);
  }

  const deletePlayer = (id) => {
    setTeam(teams.filter(player => player.id !== id))
  }

  const editTeam = (id) =>{
    setTeam(teams.map(player=>player.id === id? {...player, isEditing:!player.isEditing} :player))
  }

  const editPlayer = (task,id) =>{

    setTeam(teams.map(player=>player.id === id? {...player,task,isEditing: !player.isEditing} :player ))
  }

  return (
    <>
      <h1>Your Team</h1>
      <Team addTeam={addTeam} />

      {teams.map((player, index) => (
        player.isEditing? (
            <EditTeam editTeam={editPlayer} task = {player}/>
        ) :(
            <TeamDisplay task={player} key={index}
            deletePlayer ={deletePlayer} editTeam={editTeam}/>
        )
        
      ))}
      
    
    </>
    );
};

export default TeamWrapper;