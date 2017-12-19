/* @flow */
import React from 'react'
import styled from 'styled-components'
import PaneEditor from '../atoms/PaneEditor'
import Output from '../atoms/Output'
import RowsEditor from '../atoms/RowsEditor'
import ColumnsEditor from '../atoms/ColumnsEditor'
import Menu from '../molecules/Menu'
import enhancer from '../hoc/homeEnhancer'
import { buildPanes, buildGridContainerStyle } from '../../domain/GridState'
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
  const state = props.gridState
  const { actions } = props
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
  console.log('gridTemplateAreas')
  console.log('cells', cells.map(c => c.gridArea))
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
                  <ColumnsEditor
                    columns={columns}
                    onChangeColumn={(index, value) => {
                      actions.changeColumnValue(index, value)
                    }}
                  />
                </GridEditorArea.Columns>
                <GridEditorArea.Rows>
                  <RowsEditor
                    rows={rows}
                    onChangeRow={(index, value) => {
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
                </GridEditorArea.Edit>
              </GridEditorLayout>
            </div>
          </div>
        </AppArea.Left>
        <AppArea.Right>
          <Menu
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
          />
        </AppArea.Right>
        <AppArea.Output>
          <Output
            gridState={state}
            containerStyle={containerStyle}
            panes={panes}
          />
        </AppArea.Output>
      </AppLayout>
    </Root>
  )
})
