// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPlayerDetails } from '../../actions'; 


// const PlayerDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const playerDetails = useSelector(state => state.playerDetails); 


  


//   useEffect(() => {
//     const fetchPlayerDetails = async () => {
//       try {
//         const response = await fetch(`https://www.balldontlie.io/api/v1/players/${id}`);
//         const data = await response.json();

//         dispatch(setPlayerDetails(data));
//       } catch (error) {
//         console.error('Error fetching player details:', error);
//       }
//     };

//     fetchPlayerDetails();
//   }, [id, dispatch]);

//   if (!playerDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{playerDetails.first_name} {playerDetails.last_name}</h2>
//       <p>Height: {playerDetails.height_feet}' {playerDetails.height_inches}"</p>
//       <p>Weight: {playerDetails.weight_pounds} lbs</p>
//       <p>Position: {playerDetails.position}</p>
//       <p>Team: {playerDetails.team.full_name}</p>
//     </div>
//   );
// };

// export default PlayerDetails;