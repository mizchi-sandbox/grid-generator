/* @flow */
import type { Pane } from '../../domain/GridState'
import React, { Fragment } from 'react'
import uuid from 'uuid'
import Centerize from './Centerize'

type Props = {
  pane: Pane,
  onSet: Function,
  onClickBreak: Function
}

type State = {
  editing: boolean,
  editingValue: ?string
}

export default class PaneEditor extends React.Component<Props, State> {
  _uid: string
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false,
      editingValue: null
    }
    this._uid = 'p' + uuid()
  }

  render() {
    const { onSet, onClickBreak, pane: { cells, gridArea } } = this.props
    // const { cells, gridArea } = this.props.pane
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
              className={this._uid}
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
                  this.setState(
                    state => ({
                      ...state,
                      editing: true,
                      editingValue: gridArea
                    }),
                    () => {
                      setTimeout(() => {
                        const el: any = document.querySelector('.' + this._uid)
                        if (el) {
                          el.focus()
                          el.setSelectionRange(0, el.value.length)
                        }
                      }, 96)
                    }
                  )
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
