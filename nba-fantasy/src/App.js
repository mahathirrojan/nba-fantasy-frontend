import './NavBar.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, UseAuth } from './Components/context/AuthProvider';
import {Team} from './Components/Sports/Team';
import { TeamWrapper } from './Components/Sports/Team';
import Login from './Components/Login-SignUp/Login';
import Register from './Components/Login-SignUp/Register';
import Player from './Components/Sports/Player';
import Home from './Components/Login-SignUp/Home';
import PlayerDetails from './Components/Sports/PlayerDetails';
import Logout from './Components/Login-SignUp/LogOut';


function App() {
  const auth = UseAuth();

  const NavBar = () => {
    const auth = UseAuth();
  
    return (
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {auth.user && (
            <li>
              {/* Display Logout component when user is authenticated */}
              <Logout />
            </li>
          )}
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/player">Player</Link>
                </li>
                <li>
                    <Link to="/team">Team</Link>
                </li>
        </ul>
      </nav>
    );
  };
  

  return (
    
    <AuthProvider>
      

      <div>
        <NavBar />

        <Routes>
          <Route
            path="/login"
            element={auth.user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/player" element={<Player />} >
          <Route path="/player/:id" element={<PlayerDetails />} />
          </Route>
          <Route path="/team" element={<TeamWrapper />} />
        </Routes>
      </div>
      
    </AuthProvider>
    
  );
}

export default App;
