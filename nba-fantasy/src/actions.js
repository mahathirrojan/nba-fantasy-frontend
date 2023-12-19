// Existing player-related actions
export const setFilteredPlayers = (array) => {
    return {
      type: 'SET_FILTERED_PLAYERS',
      payload: array,
    };
  };
  
  export const setQuery = (query) => ({
    type: 'SET_QUERY',
    payload: query
  });
  
  export const setPlayerDetails = (details) => {
    return {
      type: 'SET_PLAYER_DETAILS',
      payload: details,
    };
  };

  // New player stats action
  export const setPlayerStats = (stats) => ({
    type: 'SET_PLAYER_STATS',
    payload: stats,
  });

// team actions
  export const setValue1 = (value) => ({
    type: 'SET_VALUE1',
    payload: value,
  });

  export const setTeam = (array) => {
    return {
      type: 'SET_TEAM',
      payload: array,
    };
  };

  export const setMessage = (value) => ({
    type: 'SET_MESSAGE',
    payload: value,
  });

//   New auth-related actions
  export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });

  export const setLocalUser = (userauth) => ({
    type: 'SET_LOCAL_USER',
    payload: userauth,
  });

  export const setPwd = (password) => ({
    type: 'SET_PASSWORD',
    payload: password,
  });

  export const setErrMsg = (msg) => ({
    type: 'SET_MSG',
    payload: msg,
  });

  export const setSuccess = (state) => ({
    type: 'SET_SUCCESS',
    payload: state,
  });

  export const setUserId = (id) => ({
    type: 'SET_USER_ID',
    payload: id,
  });

  
  export const setValidName = (isValid) => ({
    type: 'SET_VALID_NAME',
    payload: isValid,
  });
  
  export const setUserFocus = (isFocused) => ({
    type: 'SET_USER_FOCUS',
    payload: isFocused,
  });
  

  
  export const setValidPassword = (isValid) => ({
    type: 'SET_VALID_PASSWORD',
    payload: isValid,
  });
  
  export const setPasswordFocus = (isFocused) => ({
    type: 'SET_PASSWORD_FOCUS',
    payload: isFocused,
  });
  
  export const setMatchPassword = (matchPassword) => ({
    type: 'SET_MATCH_PASSWORD',
    payload: matchPassword,
  });
  
  export const setValidMatch = (isValid) => ({
    type: 'SET_VALID_MATCH',
    payload: isValid,
  });
  
  export const setMatchFocus = (isFocused) => ({
    type: 'SET_MATCH_FOCUS',
    payload: isFocused,
  });
  
  export const setErrMsgRegister = (message) => ({
    type: 'SET_ERROR_MESSAGE',
    payload: message,
  });
  
  export const setSuccessRegsiter = (isSuccess) => ({
    type: 'SET_REGISTRATION_SUCCESS',
    payload: isSuccess,
  });
  
  
  