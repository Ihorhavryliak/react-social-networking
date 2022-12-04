
export type Frieds = {
 id: number, 
 name: string
}


let initialState = {
  frieds: [{id: '1', name: 'Taras'},{id: 2, name: 'Nazar'},{id: 3, name: 'Irina'}] as Array<Frieds>,
}

export type InitialStateType =  typeof initialState

const slideBarReducer = (state = initialState, action: any): InitialStateType => {

  return {...state,
    frieds : [...state.frieds],
  }
  
}

export default slideBarReducer;