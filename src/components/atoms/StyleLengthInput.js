/* @flow */
import React from 'react'

type Props = {
  value: string,
  onChangeValidly: Function
}

type State = {
  editingValue: string
}

const validate = value => /\d+(px|vh|fr|%)/.test(value)
export default class StyleLengthInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editingValue: props.value
    }
  }
  render() {
    const { onChangeValidly } = this.props
    const { editingValue } = this.state
    const valid = validate(editingValue)

    return (
      <input
        style={{
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: valid ? 'transparent' : '#faa'
        }}
        value={editingValue}
        onChange={ev => {
          const nextValue = ev.target.value
          this.setState(
            {
              editingValue: nextValue
            },
            () => {
              if (validate(nextValue)) {
                onChangeValidly(nextValue)
              }
            }
          )
        }}
      />
    )
  }
}
