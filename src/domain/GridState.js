/* @flow */
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'
import range from 'lodash.range'
import uniq from 'lodash.uniq'

type ID = number

export type Cell = {
  id: ID,
  gridArea: string
}

export type Pane = {
  id: ID,
  gridArea: string,
  parentCellId: number,
  cells: Cell[]
}

export type GridState = {
  previewWidth: string,
  previewHeight: string,
  width: string,
  height: string,
  columns: Array<string>,
  rows: Array<string>,
  rowCount: number,
  cells: Array<Cell>,
  columnCount: number,
  selectedPaneId: ?string
}

export const buildPanes = ({ cells }: GridState): Array<Pane> => {
  const areaNames = uniq(cells.map(c => c.gridArea))
  return areaNames.map(name => {
    const includedCells = cells.filter(cell => cell.gridArea === name)
    const { id } = includedCells[0]
    return {
      gridArea: name,
      id: name + includedCells.map(i => i.id.toString()).join('-'),
      parentCellId: id,
      cells: includedCells
    }
  })
}

export const getMinBlankId = (ids: number[]): number => {
  let cnt = 0
  while (cnt < ids.length) {
    const r = ids.find(id => id === cnt)
    if (r == null) {
      return cnt
    }
    cnt++
  }
  return ids.length
}

export function createCell(cells: Cell[]) {
  const id = getMinBlankId(cells.map(c => c.id))
  return {
    id,
    gridArea: `g${id}`
  }
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
  const { cells, rows, rowCount } = state
  return {
    ...state,
    rowCount: rowCount + 1,
    rows: rows.concat(['1fr']),
    cells: range(state.columnCount).reduce(
      acc => [...acc, createCell(acc)],
      cells
    )
  }
}

export const addColumn = (state: GridState): GridState => {
  const { cells, columns, columnCount } = state
  const buf = cells.slice()
  return {
    ...state,
    columnCount: columnCount + 1,
    columns: columns.concat(['1fr']),
    cells: flatten(
      chunk(cells, columnCount).map(row => {
        const newCell = createCell(buf)
        buf.push(newCell)
        return [...row, newCell]
      })
    )
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
  const buf = cells.slice()
  return {
    ...state,
    cells: cells.map(cell => {
      if (cell.gridArea === gridArea) {
        const newCell = createCell(buf)
        buf.push(newCell)
        return newCell
      } else {
        return cell
      }
    })
  }
}
