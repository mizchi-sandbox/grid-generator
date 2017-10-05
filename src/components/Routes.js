/* @flow */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Foo from './Foo'
import Bar from './Bar'
import Home from './Home'
import Header from './molecules/Header'

export default function Routes() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/foo" exact component={Foo} />
        <Route path="/bar" exact component={Bar} />
      </Switch>
    </main>
  )
}
