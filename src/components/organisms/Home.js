/* @flow */
import type { GridState } from '../../domain/GridState'
import React, { Fragment } from 'react'
import range from 'lodash.range'
import uniq from 'lodash.uniq'
import Pane from '../atoms/Pane'
import Output from '../atoms/Output'
import {
  deleteRow,
  deleteColumn,
  resetUid,
  genUid,
  addRow,
  addColumn,
  cellsToAreas
} from '../../domain/GridState'

const assign: any = Object.assign

const VERSION = '2'
const LAST_SAVE_VERSION = 'last-save-version'
const STATE = 'state'

const initialState = {
  width: '640px',
  height: '480px',
  columns: ['1fr'],
  rows: ['1fr'],
  rowCount: 1,
  columnCount: 1,
  cells: [{ name: 'g0', id: '#root' }],
  selectedPaneId: null
}

export default class Home extends React.Component<void, GridState> {
  state = initialState

  updateCellName(id: number, name: string) {
    this.setState(state => {
      return {
        ...state,
        cells: state.cells.map(cell => {
          if (cell.id === id) {
            return { ...cell, name }
          } else {
            return cell
          }
        })
      }
    })
  }

  breakPanes(name: string) {
    const { cells } = this.state
    this.setState(state => ({
      ...state,
      cells: cells.map(cell => {
        if (cell.name === name) {
          return { ...cell, name: 'g' + genUid() }
        } else {
          return cell
        }
      })
    }))
  }

  componentDidMount() {
    const lastSaveVersion = window.localStorage.getItem(LAST_SAVE_VERSION)

    if (VERSION !== lastSaveVersion) {
      window.localStorage.clear()
      return
    }

    const lastState = window.localStorage.getItem(STATE)
    if (lastState) {
      const state = JSON.parse(lastState)
      resetUid(state.cells.length + 10)
      this.setState(state)
      console.log('loaded last state')
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem(STATE, JSON.stringify(this.state))
    window.localStorage.setItem(LAST_SAVE_VERSION, VERSION)
    console.log('saved')
  }

  render() {
    const containerStyle = {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: this.state.columns.join(' '),
      gridTemplateRows: this.state.rows.join(' '),
      gridTemplateAreas: cellsToAreas(this.state)
    }

    const { cells, columns, rows } = this.state
    // debugger
    const gridNames = uniq(cells.map(c => c.name))

    return (
      <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: `
                60px ${this.state.width} 60px
              `,
              gridTemplateRows: `
                30px
                1fr
                30px
              `,
              gridTemplateAreas: `
              "_0   columns addc menu"
              "rows table   _3   menu"
              "addr _2      _4   menu"
            `
            }}
          >
            <div style={{ gridArea: 'columns' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: columns.join(' '),
                  gridTemplateAreas:
                    '"' +
                    range(columns.length)
                      .map(i => 'g' + i.toString())
                      .join(' ') +
                    '"'
                }}
              >
                {columns.map((column, index) => {
                  return (
                    <div
                      key={index}
                      style={{ gridArea: 'g' + index.toString() }}
                    >
                      <input
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        value={column}
                        onChange={ev =>
                          this.setState({
                            ...this.state,
                            columns: assign([], columns, {
                              [index]: ev.target.value
                            })
                          })
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ gridArea: 'addr' }}>
              <button onClick={() => this.setState(addRow)}>+</button>
              /
              <button onClick={() => this.setState(deleteRow)}>-</button>
            </div>
            <div style={{ gridArea: 'addc' }}>
              <button onClick={() => this.setState(addColumn)}>+</button>
              /
              <button onClick={() => this.setState(deleteColumn)}>-</button>
            </div>
            <div style={{ gridArea: 'rows' }}>
              <div
                style={{
                  display: 'grid',
                  height: '100%',
                  gridTemplateRows: rows.join(' '),
                  gridTemplateAreas: range(rows.length)
                    .map(i => `"g${i}"`)
                    .join('\n')
                }}
              >
                {rows.map((row, index) => {
                  return (
                    <div
                      key={index}
                      style={{ gridArea: 'g' + index.toString() }}
                    >
                      <input
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        value={row}
                        onChange={ev =>
                          this.setState({
                            ...this.state,
                            rows: assign([], rows, {
                              [index]: ev.target.value
                            })
                          })
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ gridArea: 'menu' }}>
              <div>
                <button
                  onClick={_ev => {
                    window.localStorage.clear()
                    this.setState(initialState)
                  }}
                >
                  RESET
                </button>
              </div>
              <div>
                width:
                <input
                  value={this.state.width}
                  onChange={ev => this.setState({ width: ev.target.value })}
                />
              </div>
              <div>
                height:
                <input
                  value={this.state.height}
                  onChange={ev => this.setState({ height: ev.target.value })}
                />
              </div>
            </div>
            <div
              style={{
                gridArea: 'table',
                width: this.state.width,
                height: this.state.height
              }}
            >
              <div style={containerStyle}>
                {gridNames.map((gridName, index) => {
                  const includedCells = cells.filter(
                    cell => cell.name === gridName
                  )
                  const { id, name } = includedCells[0]
                  return (
                    <Pane
                      key={index}
                      gridName={gridName}
                      cells={includedCells}
                      onSet={value => this.updateCellName(id, value)}
                      onClickBreak={() => {
                        this.breakPanes(name)
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Output state={this.state} containerStyle={containerStyle} />
      </Fragment>
    )
  }
}
