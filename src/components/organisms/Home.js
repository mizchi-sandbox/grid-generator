/* @flow */
import React from 'react'
import styled from 'styled-components'
import PaneEditor from '../atoms/PaneEditor'
import CellEditor from '../atoms/CellEditor'
import Output from '../atoms/Output'
import GridRowsEditor from '../atoms/GridRowsEditor'
import GridColumnsEditor from '../atoms/GridColumnsEditor'
import Menu from '../molecules/Menu'
import enhancer from '../hoc/homeEnhancer'
import {
  buildPanes,
  buildGridContainerStyle,
  buildGridContainerStyleByCells
} from '../../domain/GridState'
import AppLayout, * as AppArea from '../layouts/AppLayout'
import GridEditorLayout, * as GridEditorArea from '../layouts/GridEditorLayout'

const Root = styled.div`
  width: 100%;
  height: 100%;
`

const controllerX = '60px'
const controllerY = '30px'

const addPx = (...vals: string[]) => {
  const sum = vals.reduce((acc, val) => {
    const n = Number(val.replace('px', ''))
    return acc + n
  }, 0)
  return `${sum}px`
}

export default enhancer(props => {
  const { actions, editMode, gridState: state, selectedCellId } = props

  const {
    cells,
    columns,
    rows,
    width,
    height,
    previewWidth,
    previewHeight
  } = state

  const containerStyle = buildGridContainerStyle(state)
  console.log('columns', columns)
  console.log('rows', rows)
  console.log('-- gridTemplateAreas --')
  console.log(containerStyle.gridTemplateAreas.replace(/' '/g, "'\n'"))

  const realContainerWidth =
    previewWidth.indexOf('%') > -1
      ? previewWidth
      : addPx(controllerX, previewWidth, controllerX)

  const realContainerHeight =
    previewHeight.indexOf('%') > -1
      ? previewHeight
      : addPx(controllerY, previewHeight, controllerY)

  const panes = buildPanes(state)
  return (
    <Root>
      <AppLayout>
        <AppArea.Left>
          {['panes', 'cells'].includes(editMode) ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: realContainerWidth,
                  height: realContainerHeight
                }}
              >
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
                                actions.updatePaneGridArea(
                                  pane.parentCellId,
                                  value
                                )
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
                              selected={cell.id === selectedCellId}
                              onSelect={() => {
                                actions.selectCell(cell.id)
                              }}
                              onSet={value =>
                                actions.updatePaneGridArea(cell.id, value)
                              }
                            />
                          )
                        })}
                      </div>
                    )}
                  </GridEditorArea.Edit>
                </GridEditorLayout>
              </div>
            </div>
          ) : (
            <Output
              gridState={state}
              containerStyle={containerStyle}
              panes={panes}
            />
          )}
        </AppArea.Left>
        <AppArea.Right>
          <Menu
            cells={cells}
            selectedCellId={selectedCellId}
            editMode={editMode}
            previewWidth={previewWidth}
            previewHeight={previewHeight}
            width={width}
            height={height}
            onSelectPreset={data => {
              window.localStorage.clear()
              actions.reset(data)
            }}
            onChangeValue={(key, value) => {
              actions.updateParam(key, value)
            }}
            onChangeSelectedCell={(cellId, key, value) => {
              const cell = cells.find(c => c.id === cellId)
              if (cell) {
                const nextCell = { ...cell, [key]: value }
                actions.updateCell(nextCell)
              }
            }}
            onChangeEditMode={mode => {
              actions.changeEditMode(mode)
            }}
          />
        </AppArea.Right>
      </AppLayout>
    </Root>
  )
})
