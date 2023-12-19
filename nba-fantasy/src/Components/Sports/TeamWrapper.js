import React, { useState, useEffect, useCallback} from 'react';
import { Team } from './Team';
import { v4 as uuidv4 } from 'uuid';
import { TeamDisplay } from './TeamDisplay';
import {EditTeam} from './EditTeam';
import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setTeam } from '../../actions'; 

uuidv4();

export const TeamWrapper = () => {

  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  const message = useSelector(state => state.message);
  const userTeamID = useSelector(state => state.userTeamID);
  console.log(userTeamID)

  const fetchTeamData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5001/team/${userTeamID}`);
      if (response.data && response.data.players) {
        const playerData = response.data.players.map(player => ({
          id: player.id,
          task: player.person, // 'task' is used for the player's name
          points: player.points
        }));
        dispatch(setTeam(playerData));
      } else {
        dispatch(setMessage('No team data available'));
      }
    } catch (error) {
      console.error('Error fetching team data:', error);
      dispatch(setMessage('Error fetching team data'));
    }
  }, [dispatch, userTeamID]); // Add any dependencies of fetchTeamData here

  useEffect(() => {
    if (userTeamID) {
      fetchTeamData();
    }
  }, [fetchTeamData, userTeamID]); // fetchTeamData is now memoized

  


  const addTeam = async (player) => {

    dispatch(setMessage(''));
    const fantasyPoints = await fetchPointsForPlayer(player);
  
    // Check if player exists (assuming 0 points indicates non-existence)
    if (fantasyPoints !== 0) {

      try {
        await axios.post("http://localhost:5001/createPlayerAndAddToTeam/", {
          teamId: userTeamID, 
          playerData: { person: player, points: fantasyPoints }
        }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
    
        // Fetch updated team data
        fetchTeamData();

      } catch (error) {
        console.error("Error in POST request:", error);
        dispatch(setMessage('Error adding player'));
      }

      

    }
  };
  
  

  const deletePlayer = async (id) => {
    const deletePlayerResponse = await axios.delete(`http://localhost:5001/player/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });

    const newTeamsArray = teams.filter(player => player.id !== id);
    dispatch(setTeam(newTeamsArray));
};


  const editTeam = async (id) =>{
    const newTeamsArray = teams.map(player => player.id === id ? {...player, isEditing: !player.isEditing} : player);
    dispatch(setTeam(newTeamsArray));  }

  const editPlayer = (task,id) =>{

    const newTeamsArray = teams.map(player => player.id === id ? {...player, task, isEditing: !player.isEditing} : player);
    dispatch(setTeam(newTeamsArray));
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
      dispatch(setMessage(`No data found for player: Reenter Proper Name`));
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
           (
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