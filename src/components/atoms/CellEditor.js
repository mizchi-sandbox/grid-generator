/* @flow */
import type { Cell } from '../../domain/GridState'
import React, { Fragment } from 'react'
import uuid from 'uuid'
import Centerize from './Centerize'

type Props = {
  cell: Cell,
  selected: boolean,
  onSet: Function,
  onSelect: Function
}

type State = {
  editing: boolean,
  editingValue: ?string
}

export default class CellEditor extends React.Component<Props, State> {
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
    const { onSet, cell, onSelect, selected } = this.props
    const { editing, editingValue } = this.state

    return (
      <div
        style={{
          gridArea: 'g' + cell.id,
          boxSizing: 'content-box',
          outline: '1px dashed black',
          width: '100%',
          height: '100%',
          backgroundColor: selected ? '#fcc' : 'transparent'
        }}
        onClick={_ => {
          onSelect()
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
                      editingValue: cell.gridArea
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
                {cell.gridArea}
                {cell.children && `[${cell.children}]`}
              </span>
            </Fragment>
          )}
          {/* </div> */}
        </Centerize>
      </div>
    )
  }
}
