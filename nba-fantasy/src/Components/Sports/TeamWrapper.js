import React, { useState } from 'react';
import { Team } from './Team';
import { v4 as uuidv4 } from 'uuid';
import { TeamDisplay } from './TeamDisplay';
import {EditTeam} from './EditTeam';
import axios from '../api/axios'

uuidv4();

export const TeamWrapper = () => {
  const [teams, setTeam] = useState([])
  const [message, setMessage] = useState('');



  

  const addTeam = async (player) => {

    setMessage('');
    const fantasyPoints = await fetchPointsForPlayer(player);
  
    // Check if player exists (assuming 0 points indicates non-existence)
    if (fantasyPoints !== 0) {
      const newPlayer = { id: uuidv4(), task: player, points: fantasyPoints, dropped: false, isEditing: false };
      setTeam(prevTeams => [...prevTeams, newPlayer]);
    } else {
      // Optionally, set a message indicating the player does not exist
      setMessage(`Player ${player} not found or has no data available.`);
    }
  };
  
  

  const deletePlayer = (id) => {
  
    setTeam(teams.filter(player => player.id !== id))
  }

  const editTeam = (id) =>{
    setTeam(teams.map(player=>player.id === id? {...player, isEditing:!player.isEditing} :player))
  }

  const editPlayer = (task,id) =>{

    setTeam(teams.map(player=>player.id === id? {...player,task,isEditing: !player.isEditing} :player ))
  }

  const fetchPointsForPlayer = async (playerName) => {
    
    try{
      const response = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`);
      
  
      const playerId = response.data.data[0].id;
      console.log(playerId);
  
      const stats = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${playerId}`);
      

      

     
      const points = (stats.data.data[0].pts) * 1;
      const assists = (stats.data.data[0].ast) * 1.5;
      const rebounds = (stats.data.data[0].reb) * 1.2;
      const steals = (stats.data.data[0].stl) * 3;
      const blocks = (stats.data.data[0].blk) * 3;
      const turnovers = (stats.data.data[0].turnover) * -1;

      


      const fanstasypoints = points + assists + rebounds + steals + blocks + turnovers;
      const value  = Math.round(10*fanstasypoints)/10; 
      
      
  
      return value;
    }catch (error) {
      console.error('Error fetching points:', error);
      setMessage(`No data found for player: Reenter Proper Name`);
      return 0;
    }
    
  };

  const getTotalTeamPoints = () => {
    const total = teams.reduce((total, player) => total + player.points, 0);
    return Math.round(total * 10) / 10;
  };


 


  return (
    <div className="TeamWrapper">
      <div className="Team">
        <h1>Your Team</h1>
        {message && <div className="alert">{message}</div>}
        <Team addTeam={addTeam} />
        {teams.map((player, index) =>
          player.isEditing ? (
            <EditTeam editTeam={editPlayer} task={player} key={index} />
          ) : (
            <TeamDisplay task={player} key={index} deletePlayer={deletePlayer} editTeam={editTeam} />
          )
        )}
      </div>

      <div className="Scoreboard">
        <p>Total Points:</p>
        <p>{getTotalTeamPoints()}</p>
      </div>
    </div>
  );
};

export default TeamWrapper;