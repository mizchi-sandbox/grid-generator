/* @flow */
import React from 'react'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import createStore from '../createStore'

export type Props = {}

export default function App(_props: Props) {
  return (
    <Provider store={createStore()}>
      <Home />
    </Provider>
  )
}
