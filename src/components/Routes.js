/* @flow */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './organisms/Home'
import Header from './molecules/Header'

export default function Routes() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </main>
  )
}
