/* @flow */
import { createStore } from 'redux'
import reducer from './reducers'

import * as StateSave from './infrastructure/StateSave'

function getLastSavedState() {
  StateSave.checkLastVersion()
  return StateSave.load()
}

export default () => {
  const lastState: any = getLastSavedState()
  return createStore(reducer, lastState)
}
