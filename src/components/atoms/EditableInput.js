/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'

type State = {
  editing: boolean,
  editingValue: ?string
}

type Props = {
  initialValue: string,
  onDetermine: string => void,
  onCancel?: string => void,
  validate?: string => boolean,
  updateWithKey?: (State, number) => ?State,
  render?: string => React$Element<*>
}

export default class EditableInput extends React.Component<Props, State> {
  state = {
    editing: false,
    editingValue: null
  }

  render() {
    const {
      onDetermine,
      onCancel,
      updateWithKey,
      initialValue,
      render
    } = this.props
    const { editing, editingValue } = this.state

    const validate = this.props.validate || (_ => true)

    return editing ? (
      <input
        style={{
          backgroundColor:
            editingValue && validate(editingValue) ? 'transparent' : '#faa'
        }}
        value={editingValue}
        onChange={ev => {
          const value = ev.target.value
          this.setState({ editingValue: value })
        }}
        onBlur={_ev => {
          if (editingValue && !validate(editingValue) && onCancel) {
            onCancel(editingValue)
          }
          this.setState({ editingValue: null, editing: false })
        }}
        onKeyDown={ev => {
          // Enter
          if (editingValue && validate(editingValue) && ev.keyCode === 13) {
            onDetermine(editingValue)
            this.setState({ editingValue: null, editing: false })
          }
          // Esc
          if (editingValue && ev.keyCode === 27) {
            if (validate(editingValue)) {
              if (onCancel) {
                onCancel(editingValue)
                this.setState({ editingValue: null, editing: false })
              }
            }
          }
          // updateWithKey for up/down
          if (editingValue && updateWithKey) {
            const ret = updateWithKey(this.state, ev.keyCode)
            if (ret) {
              this.setState(ret)
            }
          }
        }}
      />
    ) : (
      <span
        onClick={() => {
          this.setState(
            state => ({
              ...state,
              editing: true,
              editingValue: initialValue
            }),
            () => {
              // eslint-disable-next-line
              const el: any = ReactDOM.findDOMNode(this)
              if (el) {
                el.focus()
                el.setSelectionRange(0, el.value.length)
              }
            }
          )
        }}
      >
        {render ? render(initialValue) : initialValue}
      </span>
    )
  }
}
