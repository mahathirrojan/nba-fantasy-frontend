# nba-fantasy-frontend

# requirements that are met

## (the code for the navbar is presented in Components/Website/Navbar)
- there is a top bar always present. Initially with the login and signup, once logged in more routes are shown such as the player, team, and logout. 

## ( you can look into the component files and there are the Login-SignUp, Sports, and Website all of which have components in them)
-there are more than three components in total for each page. for instance, the team page has the team wrapper, and team and team display page. Player component has Player, Player Detail, and Search Bar

## (Components/Sports/Team line 24, Sports/Player 118-123 and 175-180)
- speaking of the search bar there is one presented on the team page. two on the player page. 

## (Components/Sports/TeamWrapper the information is being gathered from lines 20-37 from the fetchTeamData and then being displayed in line 157)

- the team page specifically displays the team table with all the players associated with it. once you add a player it either adds to the player page depending on if it's a new player or uses a player already in the table. to clarify what is being presented is a user's specific team and all the players in their team.

## (Components/Sports/Player lines 128-182, 182 specifically displays the chatbox response based on the user's question)
- for values displayed in the state are very prominent on the player page. both chat responses are in a state that is being displayed. the player stat information is in a state being displayed 

## (Components/Login-SignUp/Login lines 49-57, Components/Login-SignUp/Register lines 89-101, Components/Sports/Team lines 22 and 57 and 81)
- the CRUD operations are done specifically on the team page when a player is added/created and deleted. the put operation was not done because it proved to be to complicated, but I feel as if it makes the website better because I think its easier to add a player and delete the ones you dont want. 

## (App.js lines 28-39, these are the routes but you can see all the components that are being rendered)
- four routes display different components which are the login, signup, team, and player

## (App.js line 36)
- dynamic routing is done on the player page, when you search for a player on the top you will be able to see the ID that is associated with that player

## (store.js, actions.js, reducers.js, and for any dispatch look at any components page. for instance Components/Sports/TeamWrapper lines 17 and 28. it shows we are using the state that is in the store and then dispatching any changes)
- for the redux, there is a store, action, and reducer file all presented in the root of the project, there are so many of them. the states I mentioned before like the chat responses that are being displayed, all go through the redux process. furthermore when there is a change to these states dispatch is being used. there is definitely more than one action-creator 

## (Components/Login-SignUp/Login lines 49-57, Components/Login-SignUp/Register lines 89-101, Components/Sports/Team lines 22 and 57 and 81)
- the team, login, and register page all use the backend routes to store information about the user, team, and players. also to keep track of what user is currently signed in. it is important to use the user ID to make their team and add players to that specific team

## (Components/Sports/TeamWrapper lines 104-110, Components/Sports/Player lines 34 and 45 and 58 and 74 and 85)
- Ball Dont Lie and OpenAI were the two external APIs used. Ball Dont Lie is used on teams to calculate the fantasy points and used on the player's page to get general information about the players and their most recent game. The OpenAi is specifically used to generate more information about the players and for the chatbox for the user to ask for more information. 
