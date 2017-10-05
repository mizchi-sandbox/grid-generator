/* @flow */

// Constants
export const LOAD = 'foo/load'

// Action Creators
export async function load(): Promise<{
  type: typeof LOAD,
  payload: 1
}> {
  return {
    type: LOAD,
    payload: 1
  }
}

// Reducer
export type Action = $ReturnType<typeof load>

export type State = {
  fooProp: number
}

const initialState: State = {
  fooProp: 0
}

// Reducer
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case LOAD: {
      return { ...state, fooProp: action.payload }
    }
    default: {
      return state
    }
  }
}
