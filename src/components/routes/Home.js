/* @flow */
import React, { Fragment } from 'react'
import uuid from 'uuid'
import range from 'lodash.range'
import uniq from 'lodash.uniq'
import chunk from 'lodash.chunk'

type Cell = { name: string }

type State = {
  columns: Array<string | number>,
  rows: Array<string | number>,
  rowCount: number,
  cells: Array<Cell>,
  columnCount: number
}

const fillEmptyCells = (cells: Cell[], x: number, y: number) => {
  const size = x * y - cells.length
  const addingCells = range(size).map(i => ({
    name: 'g' + (cells.length + i).toString(),
    id: uuid()
  }))
  return cells.concat(addingCells)
}

const cellsToAreas = (cells: Cell[], columnCount: number) => {
  return chunk(cells, columnCount)
    .map(row => row.map(r => r.name).join(' '))
    .map(s => `"${s}"`)
    .join(' ')
}

type CellProps = {
  cell: Cell,
  gridName: string,
  onSet: Function
}

type CellState = {
  value: string
}

class CellC extends React.Component<CellProps, CellState> {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.cell.name
    }
  }

  render() {
    const { onSet, gridName } = this.props
    const { value } = this.state

    const cellStyle = {
      gridArea: gridName,
      outline: '1px solid black'
    }

    return (
      <div style={cellStyle}>
        <input
          value={value}
          onChange={ev => {
            const value = ev.target.value
            this.setState({ value })
          }}
        />
        <button
          onClick={_ev => {
            console.log('on set', value)
            onSet(value)
          }}
        >
          set
        </button>
      </div>
    )
  }
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

  addColumn() {
    this.setState(state => ({
      ...state,
      columnCount: state.columnCount + 1,
      columns: state.columns.concat(['1fr']),
      cells: fillEmptyCells(state.cells, state.rowCount, state.columnCount + 1)
    }))
  }
  componentDidUpdate() {
    console.log(this.state.cells)
  }

  render() {
    const containerStyle = {
      width: '800px',
      height: '600px',
      display: 'grid',
      gridTemplateColumns: this.state.columns.join(' '),
      gridTemplateRows: this.state.rows.join(' '),
      gridTemplateAreas: cellsToAreas(this.state.cells, this.state.columnCount)
    }

    const { cells } = this.state
    const gridNames = uniq(cells.map(c => c.name))

    return (
      <Fragment>
        <button onClick={this.addRow.bind(this)}>Add Row</button>
        <button onClick={this.addColumn.bind(this)}>Add Column</button>
        <div style={containerStyle}>
          {gridNames.map((gridName, index) => {
            const cell = cells.find(cell => cell.name === gridName)
            return (
              <CellC
                key={index}
                gridName={gridName}
                cell={cell}
                onSet={value => this.updateCellName(cell.id, value)}
              />
            )
          })}
        </div>
        <h1>Hello!</h1>
      </Fragment>
    )
  }
}
