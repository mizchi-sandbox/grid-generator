/* @flow */
import type { Cell } from '../../domain/GridState'
import * as React from 'react'

type Props = {
  cells: Cell[],
  gridName: string,
  onSet: Function,
  onClickBreak: Function
}

type State = {
  editing: boolean,
  editingValue: ?string
}

export default class Pane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false,
      editingValue: null
    }
  }

  render() {
    const { onSet, gridName, onClickBreak, cells } = this.props
    const { editing, editingValue } = this.state

    const cellStyle = {
      gridArea: gridName,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'borderBox',
      outline: '1px dashed black'
    }

    return (
      <div style={cellStyle}>
        {editing ? (
          <input
            value={editingValue}
            onChange={ev => {
              const value = ev.target.value
              this.setState({ editingValue: value })
            }}
            onBlur={_ev => {
              onSet(editingValue)
              this.setState({ editingValue: null, editing: false })
            }}
            onKeyDown={ev => {
              if (ev.keyCode === 13) {
                onSet(editingValue)
                this.setState({ editingValue: null, editing: false })
              }
            }}
          />
        ) : (
          <React.Fragment>
            <span
              onClick={() => {
                this.setState(state => ({
                  ...state,
                  editing: true,
                  editingValue: gridName
                }))
              }}
            >
              {gridName}
            </span>
            {cells.length > 1 && (
              <div>
                <button onClick={() => onClickBreak()}>break</button>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}
