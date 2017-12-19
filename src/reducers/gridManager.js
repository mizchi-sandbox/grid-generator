/* @flow */
import type { GridState } from '../domain/GridState'
import simpleData from '../domain/presets/simple'
import * as G from '../domain/GridState'

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

export type Action =
  | $Call<typeof addRow>
  | $Call<typeof addColumn>
  | $Call<typeof breakPanes, string>
  | $Call<typeof deleteRow>
  | $Call<typeof deleteColumn>
  | $Call<typeof changeRowValue, number, string>
  | $Call<typeof changeColumnValue, number, string>
  | $Call<typeof updatePaneGridArea, number, string>
  | $Call<typeof reset, GridState>

// Reducer
export type State = {
  gridState: GridState
}

const initialState: State = { gridState: simpleData }

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case RESET: {
      return {
        gridState: action.payload
      }
    }
    case ADD_ROW: {
      return {
        gridState: G.addRow(state.gridState)
      }
    }
    case DELETE_ROW: {
      return {
        gridState: G.deleteRow(state.gridState)
      }
    }
    case ADD_COLUMN: {
      return {
        gridState: G.addColumn(state.gridState)
      }
    }
    case DELETE_COLUMN: {
      return {
        gridState: G.deleteColumn(state.gridState)
      }
    }
    case CHANGE_ROW_VALUE: {
      return {
        gridState: G.changeRowValue(
          state.gridState,
          action.payload.index,
          action.payload.value
        )
      }
    }
    case CHANGE_COLUMN_VALUE: {
      return {
        gridState: G.changeColumnValue(
          state.gridState,
          action.payload.index,
          action.payload.value
        )
      }
    }
    case UPDATE_PANE_GRID_AREA: {
      return {
        gridState: G.updatePaneGridArea(
          state.gridState,
          action.payload.paneId,
          action.payload.gridArea
        )
      }
    }
    case BREAK_PANES: {
      return {
        gridState: G.breakPanes(state.gridState, action.payload)
      }
    }
    case UPDATE_PARAM: {
      return {
        gridState: {
          ...state.gridState,
          [action.payload.key]: action.payload.value
        }
      }
    }
    default: {
      return state
    }
  }
}
