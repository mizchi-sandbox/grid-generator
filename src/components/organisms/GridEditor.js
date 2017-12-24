/* @flow */
import React from 'react'
import PaneEditor from '../molecules/PaneEditor'
import CellEditor from '../molecules/CellEditor'
import GridRowsEditor from '../molecules/GridRowsEditor'
import GridColumnsEditor from '../molecules/GridColumnsEditor'
import enhancer from '../../enhancers/homeEnhancer'
import {
  buildPanes,
  buildGridContainerStyle,
  buildGridContainerStyleByCells
} from '../../domain/GridState'
import GridEditorLayout, * as GridEditorArea from '../_layouts/GridEditorLayout'

export default enhancer(props => {
  const { actions, editMode, gridState: state, selectedCellId } = props

  const { cells, columns, rows, width, height } = state

  const containerStyle = buildGridContainerStyle(state)
  console.log('columns', columns)
  console.log('rows', rows)
  console.log('-- gridTemplateAreas --')
  console.log(containerStyle.gridTemplateAreas.replace(/' '/g, "'\n'"))

  const panes = buildPanes(state)

  return (
    <GridEditorLayout width={width} height={height}>
      <GridEditorArea.Columns>
        <GridColumnsEditor
          columns={columns}
          onChangeColumnValue={(index, value) => {
            actions.changeColumnValue(index, value)
          }}
        />
      </GridEditorArea.Columns>
      <GridEditorArea.Rows>
        <GridRowsEditor
          rows={rows}
          onChangeRowValue={(index, value) => {
            console.log('changeRowValue', index, value)
            actions.changeRowValue(index, value)
          }}
        />
      </GridEditorArea.Rows>
      <GridEditorArea.AddRowsButton>
        <button onClick={() => actions.addRow()}>+</button>
        <button onClick={() => actions.deleteRow()}>-</button>
      </GridEditorArea.AddRowsButton>
      <GridEditorArea.AddColumnsButton>
        <button onClick={() => actions.addColumn()}>+</button>
        <button onClick={() => actions.deleteColumn()}>-</button>
      </GridEditorArea.AddColumnsButton>
      <GridEditorArea.Edit>
        {editMode === 'panes' && (
          <div style={containerStyle}>
            {panes.map(pane => {
              return (
                <PaneEditor
                  key={pane.id}
                  pane={pane}
                  onSet={value =>
                    actions.updatePaneGridArea(pane.parentCellId, value)
                  }
                  onClickBreak={() => {
                    actions.breakPanes(pane.gridArea)
                  }}
                />
              )
            })}
          </div>
        )}
        {editMode === 'cells' && (
          <div style={buildGridContainerStyleByCells(state)}>
            {cells.map(cell => {
              return (
                <CellEditor
                  key={cell.id}
                  cell={cell}
                  // selected={cell.id === selectedCellId}
                  selected={false}
                  onSelect={() => {
                    actions.selectCell(cell.id)
                  }}
                  onSet={value => actions.updatePaneGridArea(cell.id, value)}
                />
              )
            })}
          </div>
        )}
      </GridEditorArea.Edit>
    </GridEditorLayout>
  )
})
