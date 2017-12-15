/* @flow */
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'

export type Cell = { name: string, id: number }

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

export const genUid = (cells: Cell[]): number => {
  let cnt = 0
  while (cnt < cells.length) {
    const r = cells.find(c => c.id === cnt)
    if (r == null) {
      return cnt
    }
    cnt++
  }
  return cells.length
}

const fillEmptyCells = (
  state: GridState,
  rowCount: number,
  columnCount: number
): Cell[] => {
  const { cells } = state
  let size = rowCount * columnCount - cells.length
  let buf = cells.slice()
  while (size--) {
    const id = genUid(buf)
    buf = buf.concat([
      {
        id,
        name: 'g' + id.toString()
      }
    ])
  }
  return buf
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

export const updateCellName = (state: GridState, id: number, name: string) => {
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
}

export function breakPanes(state: GridState, name: string): GridState {
  const { cells } = state
  return {
    ...state,
    cells: cells.map(cell => {
      if (cell.name === name) {
        return { ...cell, name: 'g' + genUid(cells) }
      } else {
        return cell
      }
    })
  }
}
