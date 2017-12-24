/* @flow */
import React from 'react'
import EditableInput from './EditableInput'

type Props = {
  initialValue: string,
  onDetermine: string => void,
  onCancel?: string => void,
  render?: string => React$Element<*>
}

const validate = value => !/^\d+/.test(value) && value.length > 0
export default function EditableText(props: Props) {
  return <EditableInput {...props} validate={validate} />
}
