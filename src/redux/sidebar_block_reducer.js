let initialState = {
  frieds: [{id: 1, name: 'Taras'},{id: 2, name: 'Nazar'},{id: 3, name: 'Irina'}],
}

const slideBarReducer = (state = initialState, action) => {

  return {...state,
    frieds : [...state.frieds]
  }
  
}

export default slideBarReducer;