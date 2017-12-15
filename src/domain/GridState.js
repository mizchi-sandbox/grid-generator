/* @flow */
import uuid from 'uuid'
import range from 'lodash.range'
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'

export type Cell = { name: string }

export type GridState = {
  width: string,
  height: string,
  columns: Array<string | number>,
  rows: Array<string | number>,
  rowCount: number,
  cells: Array<Cell>,
  columnCount: number,
  selectedPaneId: ?string
}

let cnt = 0

export const genUid = () => {
  return ++cnt
}

export const resetUid = v => {
  cnt = v
}

const fillEmptyCells = (
  state: GridState,
  rowCount: number,
  columnCount: number
): Cell[] => {
  const { cells } = state
  const size = rowCount * columnCount - cells.length
  const addingCells = range(size).map(_ => ({
    name: 'g' + genUid().toString(),
    id: uuid()
  }))
  return cells.concat(addingCells)
}

export const deleteRow = (state: GridState): GridState => {
  const { cells, rows, rowCount, columnCount } = state
  return {
    ...state,
    rowCount: rowCount - 1,
    rows: rows.slice(0, rows.length - 1),
    cells: cells.slice(0, (rowCount - 1) * columnCount)
  }
}

export const deleteColumn = (state: GridState): GridState => {
  const { cells, columns, columnCount } = state
  return {
    ...state,
    columns: columns.slice(0, columns.length - 1),
    columnCount: columnCount - 1,
    cells: flatten(chunk(cells, columnCount).map(c => c.slice(0, c.length - 1)))
  }
}

export const addRow = (state: GridState): GridState => {
  return {
    ...state,
    rowCount: state.rowCount + 1,
    rows: state.rows.concat(['1fr']),
    cells: fillEmptyCells(state, state.rowCount + 1, state.columnCount)
  }
}

export const addColumn = (state: GridState): GridState => {
  return {
    ...state,
    columnCount: state.columnCount + 1,
    columns: state.columns.concat(['1fr']),
    cells: fillEmptyCells(state, state.rowCount, state.columnCount + 1)
  }
}

export const cellsToAreas = ({ cells, columnCount }: GridState): string => {
  return chunk(cells, columnCount)
    .map(row => row.map(r => r.name).join(' '))
    .map(s => `'${s}'`)
    .join(' ')
}
