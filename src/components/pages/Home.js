/* @flow */
import React from 'react'
import Output from '../atoms/Output'
import Menu from '../molecules/Menu'
import enhancer from '../../enhancers/homeEnhancer'
import { buildPanes, buildGridContainerStyle } from '../../domain/GridState'
import HomeLayout, * as HomeArea from '../_layouts/HomeLayout'
import GridEditor from '../organisms/GridEditor'

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

  const { cells, width, height, previewWidth, previewHeight } = state

  const containerStyle = buildGridContainerStyle(state)

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
    <HomeLayout>
      <HomeArea.Left>
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
              <GridEditor />
            </div>
          </div>
        ) : (
          <Output
            gridState={state}
            containerStyle={containerStyle}
            panes={panes}
          />
        )}
      </HomeArea.Left>
      <HomeArea.Right>
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
      </HomeArea.Right>
    </HomeLayout>
  )
})
