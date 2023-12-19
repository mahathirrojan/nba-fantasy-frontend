const initialState = {
    query: '',
    playerDetails: null,
    filteredPlayers: [],
    value1: '',
    teams: [],
    message: '',
    // Auth-related states
    user: '',
    localUser: null,
    pwd: '',
    errRef: '',
    success: null,
    userId: null,
    validName: false,
    userFocus: false,
    validPwd: false,
    pwdFocus: false,
    matchPwd: '',
    validMatch: false,
    matchFocus: false,
    errMsgRegister: '',
    successRegister: false,
    playerStats: null,
    mostRecentGame: null,
    
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_QUERY':
        return { ...state, query: action.payload };
      case 'SET_PLAYER_DETAILS':
        return { ...state, playerDetails: action.payload };
      case 'SET_FILTERED_PLAYERS':
        return { ...state, filteredPlayers: action.payload };
      case 'SET_VALUE1':
        return { ...state, value1: action.payload };
      case 'SET_TEAM':
            return { ...state, teams: action.payload };
      case 'SET_MESSAGE':
        return { ...state, message: action.payload };
      // Auth-related cases
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'SET_LOCAL_USER':
        return { ...state, localUser: action.payload };
      case 'SET_PASSWORD':
        return { ...state, pwd: action.payload };
      case 'SET_MSG':
        return { ...state, errMsg: action.payload };
      case 'SET_SUCCESS':
        return { ...state, success: action.payload };
      case 'SET_USER_ID':
        return { ...state, userId: action.payload };
      case 'SET_VALID_NAME':
        return { ...state, validName: action.payload };
      case 'SET_USER_FOCUS':
        return { ...state, userFocus: action.payload };
      case 'SET_VALID_PASSWORD':
        return { ...state, validPwd: action.payload };
      case 'SET_PASSWORD_FOCUS':
        return { ...state, pwdFocus: action.payload };
      case 'SET_MATCH_PASSWORD':
        return { ...state, matchPwd: action.payload };
      case 'SET_VALID_MATCH':
        return { ...state, validMatch: action.payload };
      case 'SET_MATCH_FOCUS':
        return { ...state, matchFocus: action.payload };
      case 'SET_ERROR_MESSAGE':
        return { ...state, errMsgRegister: action.payload };
      case 'SET_REGISTRATION_SUCCESS':
        return { ...state, successRegister: action.payload };
      // New case for player stats
      case 'SET_PLAYER_STATS':
        return { ...state, mostRecentGame: action.payload };
      

  
      default:
        return state;
    }
  }
  
  export default rootReducer;
  