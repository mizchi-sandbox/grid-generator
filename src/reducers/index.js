/* @flow */
import { combineReducers } from 'redux'
import foo from './foo'
import type { State as FooState, Action as FooAction } from './foo'
import bar from './bar'
import type { State as BarState, Action as BarAction } from './bar'

export type Action = FooAction | BarAction

export type State = {
  foo: FooState,
  bar: BarState
}

export default combineReducers({ foo, bar })
