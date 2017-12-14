/* @flow */
import React, { Fragment } from 'react'
import uuid from 'uuid'
import range from 'lodash.range'
import uniq from 'lodash.uniq'
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'
import Pane from '../atoms/Pane'
import paramCase from 'param-case'

const VERSION = '1'
const LAST_SAVE_VERSION = 'last-save-version'
const STATE = 'state'

type Cell = { name: string }

type State = {
  width: string,
  height: string,
  columns: Array<string | number>,
  rows: Array<string | number>,
  rowCount: number,
  cells: Array<Cell>,
  columnCount: number,
  selectedPaneId: ?string,
  outputMode: 'css' | 'react' | 'internal'
}

let cnt = 0

const fillEmptyCells = (cells: Cell[], x: number, y: number) => {
  const size = x * y - cells.length
  const addingCells = range(size).map(_ => ({
    name: 'g' + (++cnt).toString(),
    id: uuid()
  }))
  return cells.concat(addingCells)
}

const deleteRow = (cells: Cell[], x: number, y: number) => {
  return cells.slice(0, (x - 1) * y)
}

const deleteColumn = (cells: Cell[], x: number, y: number) => {
  return flatten(chunk(cells, y).map(c => c.slice(0, c.length - 1)))
}

const cellsToAreas = (cells: Cell[], columnCount: number) => {
  return chunk(cells, columnCount)
    .map(row => row.map(r => r.name).join(' '))
    .map(s => `'${s}'`)
    .join(' ')
}

const initialState = {
  width: '640px',
  height: '480px',
  columns: ['1fr'],
  rows: ['1fr'],
  rowCount: 1,
  columnCount: 1,
  cells: [{ name: 'g0', id: uuid() }],
  selectedPaneId: null,
  outputMode: 'css'
}

export default class Home extends React.Component<void, State> {
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

  addRow() {
    this.setState(state => ({
      ...state,
      rowCount: state.rowCount + 1,
      rows: state.rows.concat(['1fr']),
      cells: fillEmptyCells(state.cells, state.rowCount + 1, state.columnCount)
    }))
  }

  deleteRow() {
    const { rows, rowCount, columnCount, cells } = this.state
    if (rowCount === 1) {
      return
    }
    this.setState(state => ({
      ...state,
      rowCount: rowCount - 1,
      rows: rows.slice(0, rows.length - 1),
      cells: deleteRow(cells, rowCount, columnCount)
    }))
  }

  addColumn() {
    this.setState(state => ({
      ...state,
      columnCount: state.columnCount + 1,
      columns: state.columns.concat(['1fr']),
      cells: fillEmptyCells(state.cells, state.rowCount, state.columnCount + 1)
    }))
  }

  deleteColumn() {
    const { columns, columnCount, rowCount, cells } = this.state
    if (columnCount === 1) {
      return
    }
    this.setState(state => ({
      ...state,
      columnCount: columnCount - 1,
      columns: columns.slice(0, columns.length - 1),
      cells: deleteColumn(cells, rowCount, columnCount)
    }))
  }

  breakPanes(name: string) {
    const { cells } = this.state
    this.setState(state => ({
      ...state,
      cells: cells.map(cell => {
        if (cell.name === name) {
          return { ...cell, name: 'g' + ++cnt }
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
      this.setState(JSON.parse(lastState))
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
      gridTemplateAreas: cellsToAreas(this.state.cells, this.state.columnCount)
    }

    const { cells, columns, rows } = this.state
    const gridNames = uniq(cells.map(c => c.name))
    const assign: any = Object.assign

    const cssString =
      '.container {\n' +
      Object.keys(containerStyle)
        .map(key => {
          const value = containerStyle[key]
          return `  ${paramCase(key)}: ${value};`
        })
        .join('\n') +
      '\n}'
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
              <button onClick={this.addRow.bind(this)}>+</button>
              /
              <button onClick={this.deleteRow.bind(this)}>-</button>
            </div>
            <div style={{ gridArea: 'addc' }}>
              <button onClick={this.addColumn.bind(this)}>+</button>
              /
              <button onClick={this.deleteColumn.bind(this)}>-</button>
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
                  onClick={ev => {
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
        <div>
          OutputMode:
          <button onClick={() => this.setState({ outputMode: 'react' })}>
            React
          </button>
          <button onClick={() => this.setState({ outputMode: 'css' })}>
            CSS
          </button>
          <button onClick={() => this.setState({ outputMode: 'internal' })}>
            Internal
          </button>
        </div>
        {this.state.outputMode === 'react' && (
          <Fragment>
            <h3>React Style Object</h3>
            <pre>const style = {JSON.stringify(containerStyle, null, 2)}</pre>
          </Fragment>
        )}
        {this.state.outputMode === 'css' && (
          <Fragment>
            <h3>CSS</h3>
            <pre> {cssString} </pre>
          </Fragment>
        )}
        {this.state.outputMode === 'internal' && (
          <Fragment>
            <h3>Grid Generator Inner Expression</h3>
            <pre> {JSON.stringify(this.state, null, 2)} </pre>
          </Fragment>
        )}
      </Fragment>
    )
  }
}
