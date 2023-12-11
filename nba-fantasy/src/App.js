import './index.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, UseAuth } from './Components/context/AuthProvider';
import {Team} from './Components/Sports/Team';
import { TeamWrapper } from './Components/Sports/Team';
import Login from './Components/Login-SignUp/Login';
import Register from './Components/Login-SignUp/Register';
import Player from './Components/Sports/Player';
import Home from './Components/Login-SignUp/Home';

function App() {
  const auth = UseAuth();

  return (
    <TeamWrapper>
    <AuthProvider>
      <div>
        <nav>
          <ul>
            {!auth.user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/player">Player</Link>
                </li>
                <li>
                  <Link to="/team">Team</Link>
                </li>
                <li>
                  <button onClick={() => auth.signout()}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={auth.user ? <Navigate to="/home" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/player" element={<Player />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </AuthProvider>
    </TeamWrapper>
  );
}

export default App;
