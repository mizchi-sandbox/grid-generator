/* @flow */
import type { Cell } from '../../domain/GridState'
import React, { Fragment } from 'react'
import Centerize from './Centerize'

type Props = {
  cells: Cell[],
  gridArea: string,
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
    const { onSet, gridArea, onClickBreak, cells } = this.props
    const { editing, editingValue } = this.state

    return (
      <div
        style={{
          gridArea,
          boxSizing: 'content-box',
          outline: '1px dashed black',
          width: '100%',
          height: '100%'
        }}
      >
        <Centerize>
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
            <Fragment>
              <span
                onClick={() => {
                  this.setState(state => ({
                    ...state,
                    editing: true,
                    editingValue: gridArea
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
          )}
          {/* </div> */}
        </Centerize>
      </div>
    )
  }
}
