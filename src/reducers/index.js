/* @flow */
import { combineReducers } from 'redux'
import gridManager from './gridManager'

const rootReducer = combineReducers({
  gridManager
})

export type State = $Call<typeof rootReducer>
export default rootReducer
