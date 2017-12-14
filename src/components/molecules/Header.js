/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'

export type Props = {}

export default function Header({  }: Props) {
  return (
    <header>
      <Link to="/">Grid Layout Generator</Link>
      <hr />
    </header>
  )
}
