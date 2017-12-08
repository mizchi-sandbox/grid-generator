/* @flow */
import 'babel-polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const el = document.querySelector('main')
if (el) {
  ReactDOM.render(<App />, el)
}
