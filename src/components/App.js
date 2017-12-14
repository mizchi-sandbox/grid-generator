/* @flow */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../components/Routes'

export type Props = {}

export default function App(_props: Props) {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}
