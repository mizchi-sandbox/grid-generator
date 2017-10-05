/* @flow */
import type { State } from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default (initialState: ?State = undefined) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(loggerMiddleware, promiseMiddleware, thunkMiddleware)
  )
}
