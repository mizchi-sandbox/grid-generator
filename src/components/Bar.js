/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../reducers'
import type { State, Action } from '../reducers/bar'
import type { Dispatch } from '../types'
import Label from './atoms/Label'

export type Props = {
  dispatch: Dispatch<Action>
}

const selector = (state: RootState): State => {
  return state.bar
}

export default connect(selector)((props: State) => {
  return (
    <div>
      <h1>Bar</h1>
      <Label text={props.barProp.toString()} />
    </div>
  )
})
