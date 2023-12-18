import { createContext, useContext } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setUser, setSuccess, setLocalUser } from '../../actions'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localUser = useSelector(state => state.localUser);

  const dispatch = useDispatch();

  const signin = (userData) => {
    dispatch(setLocalUser(userData));
    // Additional logic for Redux if necessary
  };

  const signout = () => {
    dispatch(setLocalUser(null));
    dispatch(setUser('')); // Reset user state in Redux
    dispatch(setSuccess(false)); // Reset success state in Redux
    // Dispatch other necessary actions to reset the Redux state
  };

  return (
    <AuthContext.Provider value={{ user: localUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;