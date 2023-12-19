// Player.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredPlayers, setPlayerDetails, setQuery, setPlayerStats } from '../../actions';




const Player = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredPlayers = useSelector((state) => state.filteredPlayers);
  const playerDetails = useSelector((state) => state.playerDetails);
  const mostRecentGame = useSelector((state) => state.mostRecentGame); // Updated variable name
  const query = useSelector((state) => state.query);
  const { id } = useParams();
 
  const [chatinfoOutput, setinfoChatOutput] = useState('');
  const [chatBoxInput, setChatBoxInput] = useState('');
  const [chatBoxOutput, setChatBoxOutput] = useState('');


  useEffect(() => {
    if (id) {
      fetchPlayerDetails(id);
      fetchPlayerStats(id);
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

  const fetchPlayerStats = async (playerId) => {
    try {
      const response = await fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=2023`);
      const data = await response.json();

      // Assuming the API response structure remains consistent
      const mostRecentGame = data.data[data.data.length - 1];
      dispatch(setPlayerStats(mostRecentGame));
    } catch (error) {
      console.error('Error fetching player stats:', error);
    }
  };

  const handleSearch = async () => {
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


const moreinformation = async () => {
      const chatResponse = await fetch('http://localhost:5001/getChatResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: `give me fun facts and awards gained by ${query}. in the response only give me the information. Format it with bulletpoints. each bullet point in the new line` })
    });
      const chatData = await chatResponse.json();

      setinfoChatOutput(chatData);
}

const chatboxinfo = async () => {
  const chatResponse = await fetch('http://localhost:5001/getChatResponse', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userInput: `for ${query} answer this question: ${chatBoxInput}` })
});
  const chatData = await chatResponse.json();

  setChatBoxOutput(chatData);
}




  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleChatChange = (e) => {
    setChatBoxInput(e.target.value);
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

            {/* Display stats for the most recent game */}
            {mostRecentGame && (
              <div>
                <h3>Most Recent Game Stats</h3>
                <p>Points (pts): {mostRecentGame.pts}</p>
                <p>Assists (ast): {mostRecentGame.ast}</p>
                <p>Blocks (blk): {mostRecentGame.blk}</p>
                <p>Minutes (min): {mostRecentGame.min}</p>
                <p>Rebounds (reb): {mostRecentGame.reb}</p>
                <p>Steals (stl): {mostRecentGame.stl}</p>
                <p>Turnovers (turnover): {mostRecentGame.turnover}</p>
              </div>
            )}
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
        <button onClick={moreinformation}>Want More Infomation?</button>
      </div>

      <div className="chat-box">
        
        <div>
        {chatinfoOutput && <div className="chat-response">{chatinfoOutput}</div>}
        </div>
        <div>
        <input
            type="text"
            placeholder="Ask Any Additional Questions You Have About Your Player: "
            value={chatBoxInput}
            onChange={handleChatChange}
          />
          <button onClick={chatboxinfo}>Search</button>
          {chatBoxOutput && <div className="chat-response">{chatBoxOutput}</div>}

        </div>







</div>

    </div>
  );
};

export default Player;
