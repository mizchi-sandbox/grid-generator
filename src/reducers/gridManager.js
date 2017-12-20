/* @flow */
import type { GridState, Cell } from '../domain/GridState'
import simpleData from '../domain/presets/simple'
import * as G from '../domain/GridState'

export type EditMode = 'panes' | 'cells' | 'output'

const RESET = 'gridManager/reset'
const ADD_ROW = 'gridManager/addRow'
const ADD_COLUMN = 'gridManager/addColumn'
const DELETE_ROW = 'gridManager/deleteRow'
const DELETE_COLUMN = 'gridManager/deleteColumn'
const CHANGE_ROW_VALUE = 'gridManager/changeRowValue'
const CHANGE_COLUMN_VALUE = 'gridManager/changeColumnValue'
const UPDATE_PANE_GRID_AREA = 'gridManager/updatePaneGridArea'
const BREAK_PANES = 'gridManager/breakPanes'
const UPDATE_PARAM = 'gridManager/updateParam'
const CHANGE_EDIT_MODE = 'gridManager/changeEditoMode'
const SELECT_CELL = 'gridManager/selectCell'
const UNSELECT_CELL = 'gridManager/unselectCell'
const UPDATE_CELL = 'gridManager/updateCell'

// Actions
export function reset(nextState: GridState) {
  return {
    type: RESET,
    payload: nextState
  }
}

export function addRow() {
  return {
    type: ADD_ROW
  }
}

export function addColumn() {
  return {
    type: ADD_COLUMN
  }
}

export function deleteRow() {
  return {
    type: DELETE_ROW
  }
}

export function deleteColumn() {
  return {
    type: DELETE_COLUMN
  }
}

export function changeColumnValue(index: number, value: string) {
  return {
    type: CHANGE_COLUMN_VALUE,
    payload: {
      index,
      value
    }
  }
}

export function changeRowValue(index: number, value: string) {
  return {
    type: CHANGE_ROW_VALUE,
    payload: {
      index,
      value
    }
  }
}

export function updatePaneGridArea(id: number, gridArea: string) {
  return {
    type: UPDATE_PANE_GRID_AREA,
    payload: {
      paneId: id,
      gridArea
    }
  }
}

export function breakPanes(gridArea: string) {
  return {
    type: BREAK_PANES,
    payload: gridArea
  }
}

export function updateParam(key: string, value: string) {
  return {
    type: UPDATE_PARAM,
    payload: { key, value }
  }
}

export function changeEditMode(mode: EditMode) {
  return {
    type: CHANGE_EDIT_MODE,
    payload: mode
  }
}

export function selectCell(cellId: number) {
  return {
    type: SELECT_CELL,
    payload: cellId
  }
}

export function unselectCell() {
  return {
    type: UNSELECT_CELL
  }
}

export function updateCell(cell: Cell) {
  return {
    type: UPDATE_CELL,
    payload: cell
  }
}

export type Action =
  | $Call<typeof addRow>
  | $Call<typeof addColumn>
  | $Call<typeof breakPanes, string>
  | $Call<typeof deleteRow>
  | $Call<typeof deleteColumn>
  | $Call<typeof changeRowValue, number, string>
  | $Call<typeof changeColumnValue, number, string>
  | $Call<typeof updatePaneGridArea, number, string>
  | $Call<typeof changeEditMode, EditMode>
  | $Call<typeof selectCell, number>
  | $Call<typeof unselectCell>
  | $Call<typeof updateCell, Cell>
  | $Call<typeof reset, GridState>

// Reducer
export type State = {
  gridState: GridState,
  editMode: EditMode,
  selectedCellId: ?number
}

const initialState: State = {
  gridState: simpleData,
  editMode: 'panes',
  selectedCellId: null
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case RESET: {
      return {
        ...state,
        gridState: action.payload
      }
    }
    case ADD_ROW: {
      return {
        ...state,
        gridState: G.addRow(state.gridState)
      }
    }
    case DELETE_ROW: {
      return {
        ...state,
        gridState: G.deleteRow(state.gridState)
      }
    }
    case ADD_COLUMN: {
      return {
        ...state,
        gridState: G.addColumn(state.gridState)
      }
    }
    case DELETE_COLUMN: {
      return {
        ...state,
        gridState: G.deleteColumn(state.gridState)
      }
    }
    case CHANGE_ROW_VALUE: {
      return {
        ...state,
        gridState: G.changeRowValue(
          state.gridState,
          action.payload.index,
          action.payload.value
        )
      }
    }
    case CHANGE_COLUMN_VALUE: {
      return {
        ...state,
        gridState: G.changeColumnValue(
          state.gridState,
          action.payload.index,
          action.payload.value
        )
      }
    }
    case UPDATE_PANE_GRID_AREA: {
      return {
        ...state,
        gridState: G.updatePaneGridArea(
          state.gridState,
          action.payload.paneId,
          action.payload.gridArea
        )
      }
    }
    case BREAK_PANES: {
      return {
        ...state,
        gridState: G.breakPanes(state.gridState, action.payload)
      }
    }
    case UPDATE_PARAM: {
      return {
        ...state,
        gridState: {
          ...state.gridState,
          [action.payload.key]: action.payload.value
        }
      }
    }
    case CHANGE_EDIT_MODE: {
      return {
        ...state,
        editMode: action.payload
      }
    }
    case SELECT_CELL: {
      return {
        ...state,
        selectedCellId: action.payload
      }
    }
    case UNSELECT_CELL: {
      return {
        ...state,
        selectedCellId: null
      }
    }
    case UPDATE_CELL: {
      return {
        ...state,
        gridState: G.updateCell(state.gridState, action.payload)
      }
    }
    default: {
      return state
    }
  }
}
