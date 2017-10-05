/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {}

export default function Header({  }: Props) {
  return (
    <header>
      <Link to="/">Home</Link>
      |
      <Link to="/foo">Foo</Link>
      |
      <Link to="/bar">Bar</Link>
      <hr />
    </header>
  )
}
