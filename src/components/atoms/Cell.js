/* @flow */
import * as React from 'react'

type Props = {
  cell: { name: string },
  gridName: string,
  onSet: Function
}

type State = {
  editing: boolean,
  editingValue: ?string
}

export default class CellC extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false,
      editingValue: null
    }
  }

  render() {
    const { onSet, gridName } = this.props
    const { editing, editingValue } = this.state

    const cellStyle = {
      gridArea: gridName,
      outline: '1px solid black'
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
          <span
            onDoubleClick={() => {
              this.setState(state => ({
                ...state,
                editing: true,
                editingValue: gridName
              }))
            }}
          >
            {gridName}
          </span>
        )}
      </div>
    )
  }
}
