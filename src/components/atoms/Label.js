/* @flow */
import React from 'react'

export type Props = {
  text: string
}

export default function Label({ text }: Props) {
  return <span>{text}</span>
}
