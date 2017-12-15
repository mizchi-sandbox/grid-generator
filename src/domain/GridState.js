/* @flow */
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'

export type Cell = { gridArea: string, id: number }

export type GridState = {
  width: string,
  height: string,
  columns: Array<string>,
  rows: Array<string>,
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

const fillEmptyCells = (state: GridState, to: number): Cell[] => {
  const { cells } = state
  let diff = to - cells.length
  let buf = cells.slice()
  while (diff--) {
    const id = genUid(buf)
    buf = [
      ...buf,
      {
        id,
        gridArea: 'g' + id.toString()
      }
    ]
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
    cells: fillEmptyCells(state, (state.rowCount + 1) * state.columnCount)
  }
}

export const addColumn = (state: GridState): GridState => {
  return {
    ...state,
    columnCount: state.columnCount + 1,
    columns: state.columns.concat(['1fr']),
    cells: fillEmptyCells(state, state.rowCount * (state.columnCount + 1))
  }
}

export const cellsToAreas = ({ cells, columnCount }: GridState): string => {
  return chunk(cells, columnCount)
    .map(row => row.map(r => r.gridArea).join(' '))
    .map(s => `'${s}'`)
    .join(' ')
}

export const updateCellName = (
  state: GridState,
  id: number,
  gridArea: string
) => {
  return {
    ...state,
    cells: state.cells.map(cell => {
      if (cell.id === id) {
        return { ...cell, gridArea }
      } else {
        return cell
      }
    })
  }
}

export function breakPanes(state: GridState, gridArea: string): GridState {
  const { cells } = state
  return {
    ...state,
    cells: cells.reduce((acc, cell) => {
      if (cell.gridArea === gridArea) {
        return [
          ...acc,
          {
            ...cell,
            gridArea: 'g' + genUid(acc)
          }
        ]
      } else {
        return [...acc, cell]
      }
    }, [])
  }
}
