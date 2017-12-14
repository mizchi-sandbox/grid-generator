/* @flow */
import React, { Fragment } from 'react'
import uuid from 'uuid'
import range from 'lodash.range'
import uniq from 'lodash.uniq'
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'
import CellC from '../atoms/Cell'

type Cell = { name: string }

type State = {
  columns: Array<string | number>,
  rows: Array<string | number>,
  rowCount: number,
  cells: Array<Cell>,
  columnCount: number
}

let cnt = 1

const fillEmptyCells = (cells: Cell[], x: number, y: number) => {
  const size = x * y - cells.length
  const addingCells = range(size).map(i => ({
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

export default class Home extends React.Component<void, State> {
  state = {
    columns: ['1fr'],
    rows: ['1fr'],
    rowCount: 1,
    columnCount: 1,
    cells: [{ name: 'g0', id: uuid() }]
  }

  updateCellName(id: number, name: string) {
    this.setState(state => {
      return {
        ...state,
        cells: state.cells.map((cell, index) => {
          if (cell.id === id) {
            console.log('update', index, index)
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
    this.setState(state => ({
      ...state,
      columnCount: columnCount - 1,
      columns: columns.slice(0, columns.length - 1),
      cells: deleteColumn(cells, rowCount, columnCount)
    }))
  }
  componentDidUpdate() {
    console.log(this.state.cells)
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
    return (
      <Fragment>
        <div style={{ width: '800px', height: '600px' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: `
                60px 1fr 60px
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
            <div style={{ gridArea: 'menu' }}>menu</div>
            <div style={{ gridArea: 'table' }}>
              <div style={containerStyle}>
                {gridNames.map((gridName, index) => {
                  const cell = cells.find(cell => cell.name === gridName)
                  return (
                    cell && (
                      <CellC
                        key={index}
                        gridName={gridName}
                        cell={cell}
                        onSet={value => this.updateCellName(cell.id, value)}
                      />
                    )
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <pre>style: {JSON.stringify(containerStyle, null, 2)}</pre>
      </Fragment>
    )
  }
}
