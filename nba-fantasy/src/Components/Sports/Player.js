import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Player.css';
import PlayerDetails from './PlayerDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredPlayers } from '../../actions'; 


const Player = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredPlayers = useSelector(state => state.filteredPlayers); 

  

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`);
      const data = await response.json();

      dispatch(setFilteredPlayers(data.data));

      if (data.data.length === 1) {
        
        navigate(`/player/${data.data[0].id}`);
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <header className="header">
          <h1>NBA Player Search</h1>
        </header>

        <SearchBar onSearch={handleSearch} />

        <ul className="player-list">
          {filteredPlayers.map((player) => (
            <li key={player.id}>
              <Link to={`/player/${player.id}`} className="player-link">
                {player.first_name} {player.last_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Player;
