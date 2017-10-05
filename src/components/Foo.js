/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import type { State as RootState } from '../reducers'
import type { State, Action } from '../reducers/foo'
import type { Dispatch } from '../types'
import Label from './atoms/Label'

export type Props = State & {
  dispatch: Dispatch<Action>
}

const selector = (state: RootState): State => {
  return state.foo
}

export default connect(selector)((props: Props) => {
  return (
    <div>
      <h1>Foo</h1>
      <Label text={props.fooProp.toString()} />
    </div>
  )
})
