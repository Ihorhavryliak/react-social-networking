const FOLLOW = 'FOLLOW';
const UNFFOLOW = 'UNFFOLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
  users: [
    /* {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Ihor', status: 'I am a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
    {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: true, fullName: 'Vasia', status: 'I am a boss too', location: {city: 'London', country: 'Ukraine'} }, 
    {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Roman', status: 'I am not a boss', location: {city: 'Lviv', country: 'USA'} }, 
    {id: 4, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am  not a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
    {id: 5, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am not a boss', location: {city: 'Lviv', country: 'Ukraine'} }, 
    {id: 6, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSqze_aA54povlzYiL_6SyPkvMicwJ_ilzA&usqp=CAU', followed: false, fullName: 'Name', status: 'I am not a boss', location: {city: 'Lviv', country: 'Ukraine'} },  */

  ],

}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:

    return {
      ...state, 
      users: state.users.map( u => {
        if(u.id === action.userId) {
          return {...u, followed: true};
        }
        return u;} )
    }

    case UNFFOLOW:

      return {
        ...state, 
        users: state.users.map( u => {
          if(u.id === action.userId) {
            return {...u, followed: false};
          }
          return u;} )
      }
      
    case SET_USERS:
      return {...state, users: [...state.users, ...action.users]}

    default:
          return state;
  }

}

export const followedAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFFOLOW, userId});
export const setUserAC = (users) => ({type: SET_USERS, users})
export default userReducer;