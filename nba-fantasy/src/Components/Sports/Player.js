// Player.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredPlayers, setPlayerDetails, setQuery } from '../../actions'; // Make sure to import necessary actions
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true } // This is also the default, can be omitted
);

const Player = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredPlayers = useSelector((state) => state.filteredPlayers);
  const playerDetails = useSelector((state) => state.playerDetails);
  const query = useSelector((state) => state.query);
  const { id } = useParams();
 
const [chatOutput, setChatOutput] = useState('');


  useEffect(() => {
    if (id) {
      fetchPlayerDetails(id);
    }
  }, [id]);

  const fetchPlayerDetails = async (playerId) => {
    try {
      const response = await fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`);
      const data = await response.json();

      dispatch(setPlayerDetails(data));
    } catch (error) {
      console.error('Error fetching player details:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${query}`);
      const data = await response.json();
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        messages: [{ "role": "user", "content":  `give me fun facts and awards gained by ${query}. in the repsonse only give me the infromation` }],
    });
    setChatOutput(chatCompletion.choices[0].message.content);

      dispatch(setFilteredPlayers(data.data));

      if (data.data.length === 1) {
        navigate(`/player/${data.data[0].id}`);
      }
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };




  return (
    <div>
      <div className="container">
        <header className="header">
          <h1>NBA Player Search</h1>
        </header>

        <div>
          <input
            type="text"
            placeholder="Search players..."
            value={query}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {id && playerDetails ? (
          <div>
            <h2>{playerDetails.first_name} {playerDetails.last_name}</h2>
            <p>Height: {playerDetails.height_feet}' {playerDetails.height_inches}"</p>
            <p>Weight: {playerDetails.weight_pounds} lbs</p>
            <p>Position: {playerDetails.position}</p>
            <p>Team: {playerDetails.team.full_name}</p>
          </div>
          
        ) : (
          <ul className="player-list">
            {filteredPlayers.map((player) => (
              <li key={player.id}>
                <Link to={`/player/${player.id}`} className="player-link">
                  {player.first_name} {player.last_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-box">
    {chatOutput && <div className="chat-response">{chatOutput}</div>}
</div>

    </div>
  );
};

export default Player;
