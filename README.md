# nba-fantasy-frontend

## requirments that are met

- there is a top bar always present. Intially with the login and signup, once logged in more routes are shown such as the player, team and logout
-there are definitly more than three components in total and for each page. for instance the team page has the team wrapper, team and team display page. Player has Player, PLayer Detail and Search Bar

- speaking of search bar there is one on the team page. two on the player page

- the team page specifically displays the team table with all the players associated with it. once you add a player it either adds to the player page depending on if its a new player or uses a player already in the table. to clarify what is being presented is a user's specific team and all the players in their team

- for values that is being displayed in state is very prominent in the player page. the both chat response is in a state that is being displayed. the player stat information is in a state being displayed 

- the CRUD operations are done specifically in the team page when a player is added/created and deleted. the put operation was not done because it proved to be to complicated, but i feel as it makes the website better because i think its easier just to add a player and just delete the ones you dont want

- their are four routes that display differnt components which are the login, signup, team and player

- dynamic routing is done in the player page, when you search up a player on the top you will be able to see the id that is associated with that player

- for the redux there is a store, action and reducer file all presented in the root of the project, there is so many of them. the states i mentioned before like the chat responses that are being displayed, they all go through the redux process. furthermore when there is a change to these states dispatch is being used. there is definitely more than one action creator

- the team, login and register page all use the backend routes to store information about the user, team and players. also to keep track of what user is currently signed in. it is important to use the user id to make their team and add players to that specific team

- the two external API that was used was Ball Dont Lie and OpenAI. Ball Dont Lie is used on team to calcuate the the fanstaty points and used in the players page to get general information about the players and their most recent game. The OpenAi is specifically used to generate more information about the players and for the chatbox for the user to ask more information.
