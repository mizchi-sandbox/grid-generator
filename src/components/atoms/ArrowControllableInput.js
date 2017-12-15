/* @flow */
import * as React from 'react'

type Props = {
  value: string,
  onDefine: string => void,
  validate: string => boolean
}

type State = {
  editing: boolean,
  valid: ?boolean,
  editingValue: ?string
}
export class ArrowControllableInput extends React.Component<Props, State> {
  state = {
    editing: false,
    valid: null,
    editingValue: null
  }

  render() {
    if (this.state.editing) {
      const { onDefine, validate } = this.props
      const { editingValue, valid } = this.state
      return (
        <input
          style={{
            backgroundColor: valid ? null : 'rgba(255, 200, 200, 0.3)'
          }}
          value={editingValue}
          onChange={ev => {
            const value = ev.target.value
            const valid = validate(value)
            this.setState({ editingValue: value, valid })
          }}
          onBlur={_ev => {
            const { editingValue, valid } = this.state
            if (editingValue && valid) {
              onDefine(editingValue)
            } else {
              onDefine(this.props.value)
            }
            this.setState({ editing: false, valid: null, editingValue: null })
          }}
          onKeyDown={ev => {
            const { editingValue, valid } = this.state
            if (editingValue && valid && ev.keyCode === 13) {
              onDefine(editingValue)
              this.setState({ editing: false, valid: null, editingValue: null })
            }
          }}
        />
      )
    } else {
      const { value } = this.props
      return (
        <Fragment>
          <span
            onClick={() => {
              this.setState(state => ({
                ...state,
                editing: true,
                editingValue: value
              }))
            }}
          >
            {gridArea}
          </span>
          {cells.length > 1 && (
            <div>
              <button onClick={() => onClickBreak()}>break</button>
            </div>
          )}
        </Fragment>
      )
    }
  }
}
