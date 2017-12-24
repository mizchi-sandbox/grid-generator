/* @flow */
import React from 'react'
import EditableInput from './EditableInput'

type Props = {
  initialValue: string,
  onDetermine: string => void,
  onCancel?: string => void,
  render?: string => React$Element<*>
}

const validate = value => /\d+(px|vh|%)/.test(value)
export default function EditableStyleLength(props: Props) {
  return (
    <EditableInput
      {...props}
      validate={validate}
      updateWithKey={(state, keyCode) => {
        switch (keyCode) {
          // up
          case 38: {
            return { ...state, editingValue: '10px' }
          }
        }
      }}
    />
  )
}
