import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import PlayerDetails from './PlayerDetails';
import './Player.css';

const Player = () => {
  // State to store filtered player data
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  // Function to handle player search
  const handleSearch = async (query) => {
    try {
      // Fetch player data from the API based on the search query
      const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`);
      const data = await response.json();

      // Update state with the filtered player data
      setFilteredPlayers(data.data);

      // Redirect to the player details page if only one result is found
      if (data.data.length === 1) {
        // Use the `navigate` function from the `useNavigate` hook
        window.location.href = `/player/${data.data[0].id}`;
      }
    } catch (error) {
      // Log an error if there's an issue fetching player data
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div>
      {/* Main container div */}
      <div className="container">
        {/* Header section */}
        <header className="header">
          <h1>NBA Player Search</h1>
        </header>

        {/* SearchBar component for user input */}
        <SearchBar onSearch={handleSearch} />

        {/* Display a list of filtered players */}
        <ul className="player-list">
          {filteredPlayers.map((player) => (
            <li key={player.id}>
              {/* Link to the player details page */}
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
