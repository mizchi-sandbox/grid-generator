/* @flow */
import flatten from 'lodash.flatten'
import chunk from 'lodash.chunk'
import range from 'lodash.range'
import uniq from 'lodash.uniq'

const assign = (Object.assign: any)

type ID = number

export type Cell = {
  id: ID,
  gridArea: string,
  children: string
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
  const areaNames = uniq(cells.map(c => c.gridArea)).filter(c => c !== '.')
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
    gridArea: `g${id}`,
    children: ''
  }
}

export const changeColumnValue = (
  state: GridState,
  index: number,
  value: string
) => {
  const { columns } = state
  return {
    ...state,
    columns: assign([], columns, {
      [index]: value
    })
  }
}

export const changeRowValue = (
  state: GridState,
  index: number,
  value: string
) => {
  const { rows } = state
  return {
    ...state,
    rows: assign([], rows, {
      [index]: value
    })
  }
}

export const updateCell = (state: GridState, cell: Cell) => {
  const { cells } = state
  const idx = cells.findIndex(c => c.id === cell.id)
  return {
    ...state,
    cells: assign([], cells, {
      [idx]: cell
    })
  }
}

export const deleteRow = (state: GridState): GridState => {
  const { cells, rows, rowCount, columnCount } = state
  if (rowCount === 1) {
    return state
  }
  return {
    ...state,
    rowCount: rowCount - 1,
    rows: rows.slice(0, rows.length - 1),
    cells: cells.slice(0, (rowCount - 1) * columnCount)
  }
}

export const deleteColumn = (state: GridState): GridState => {
  const { cells, columns, columnCount } = state
  if (columnCount === 1) {
    return state
  }
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

// TODO: Fix to paneId
export const updatePaneGridArea = (
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

// Calc style
export const buildGridTemplateAreas = (
  cells: Cell[],
  columnCount: number
): string => {
  return chunk(cells, columnCount)
    .map(row => row.map(r => r.gridArea).join(' '))
    .map(s => `'${s}'`)
    .join(' ')
}

export const buildGridContainerStyle = ({
  width,
  height,
  columns,
  rows,
  cells,
  columnCount
}: GridState): any => {
  const gridTemplateAreas = buildGridTemplateAreas(cells, columnCount)
  return {
    width,
    height,
    display: 'grid',
    gridTemplateColumns: columns.join(' '),
    gridTemplateRows: rows.join(' '),
    gridTemplateAreas
  }
}

export const buildGridTemplateAreasByCells = (
  cells: Cell[],
  columnCount: number
): string => {
  return chunk(cells, columnCount)
    .map(row => row.map(cell => 'g' + cell.id).join(' '))
    .map(s => `'${s}'`)
    .join(' ')
}

export const buildGridContainerStyleByCells = ({
  width,
  height,
  columns,
  rows,
  cells,
  columnCount
}: GridState): any => {
  const gridTemplateAreas = buildGridTemplateAreasByCells(cells, columnCount)
  return {
    width,
    height,
    display: 'grid',
    gridTemplateColumns: columns.join(' '),
    gridTemplateRows: rows.join(' '),
    gridTemplateAreas
  }
}
