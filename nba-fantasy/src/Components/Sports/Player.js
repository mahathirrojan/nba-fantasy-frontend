// Player.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredPlayers, setPlayerDetails, setQuery, setPlayerStats } from '../../actions';
import './Player.css';




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
      <div className="containers">
        <section>
        <header className="headers">
          <h1>NBA Player Search</h1>
        </header>

        <div>
          <input
            type="text"
            placeholder="Search players..."
            value={query}
            onChange={handleChange}
          />
          <button className="button-search"onClick={handleSearch}>Search</button>
          
        </div>
        </section>
        {id && playerDetails ? (
          <div className="stats">
            <h2>{playerDetails.first_name} {playerDetails.last_name}</h2>
            <p>Height: {playerDetails.height_feet}' {playerDetails.height_inches}"</p>
            <p>Weight: {playerDetails.weight_pounds} lbs</p>
            <p>Position: {playerDetails.position}</p>
            <p>Team: {playerDetails.team.full_name}</p>

            {/* Display stats for the most recent game */}
            {mostRecentGame && (
              <div className="stats">
                <h3>Most Recent Game Stats</h3>
                <p>Points: {mostRecentGame.pts}</p>
                <p>Assists: {mostRecentGame.ast}</p>
                <p>Blocks: {mostRecentGame.blk}</p>
                <p>Minutes Played: {mostRecentGame.min}</p>
                <p>Rebounds: {mostRecentGame.reb}</p>
                <p>Steals: {mostRecentGame.stl}</p>
                <p>Turnovers: {mostRecentGame.turnover}</p>
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
        <button className="button-more-information"onClick={moreinformation}>Want More Infomation?</button>
      </div>
      <section className='ai-chat-box'>
  
      <div className="chat-box">
        <section className="ai-chat-box">
        
        <div>
        {chatinfoOutput && <div className="chat-response-more">{chatinfoOutput}</div>}
        </div>
        <div>
        <h1>Hello! I am your NBA Virtual Assistant</h1>
        <input
            type="text"
            placeholder="Ask Any Additional Questions You Have About Your Player: "
            value={chatBoxInput}
            onChange={handleChatChange}
          />
          <button onClick={chatboxinfo}>Submit</button>
          {chatBoxOutput && <div className="chat-response">{chatBoxOutput}</div>}
          
        </div>
        
        




        </section>


</div>
</section>
            
    </div>
  );
};

export default Player;
