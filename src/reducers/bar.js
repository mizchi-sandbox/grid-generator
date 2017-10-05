/* @flow */

// Constants
export const LOAD = 'bar/load'

// Action Creators
export async function load(): Promise<{
  type: typeof LOAD,
  payload: 2
}> {
  return {
    type: LOAD,
    payload: 2
  }
}

// Reducer
export type Action = $ReturnType<typeof load>

export type State = {
  barProp: number
}

const initialState: State = {
  barProp: 0
}

// Reducer
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD: {
      return { ...state, barProp: action.payload }
    }
    default: {
      return state
    }
  }
}
