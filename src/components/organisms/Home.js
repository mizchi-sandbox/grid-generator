/* @flow */
import type { GridState } from '../../domain/GridState'
import React, { Fragment } from 'react'
import uniq from 'lodash.uniq'
import styled from 'styled-components'
import PaneEditor from '../atoms/PaneEditor'
import Output from '../atoms/Output'
import RowsEditor from '../atoms/RowsEditor'
import ColumnsEditor from '../atoms/ColumnsEditor'
import Menu from '../molecules/Menu'
import holyGrailData from '../../domain/holyGrailData'

import {
  deleteRow,
  deleteColumn,
  addRow,
  addColumn,
  cellsToAreas,
  updateCellName,
  breakPanes
} from '../../domain/GridState'

const Root: React.StatelessComponent<{}> = styled.div`
  width: 100%;
  height: 100%;
`

const GridEditorLayout: React.StatelessComponent<{
  width: number,
  height: number,
  children: any
}> = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: grid;
  grid-template-columns: 60px 1fr 50px;
  grid-template-rows:
    30px
    1fr
    30px;
  grid-template-areas:
    '_0   columns addc'
    'rows edit    _1'
    'addr _2      _3';
`

const ColumnsArea: React.StatelessComponent<{}> = styled.div`
  grid-area: columns;
`

const AddColumnsButtonArea: React.StatelessComponent<{}> = styled.div`
  grid-area: addc;
`

const AddRowsButtonArea: React.StatelessComponent<{}> = styled.div`
  grid-area: addr;
`

const RowsArea: React.StatelessComponent<{}> = styled.div`
  grid-area: rows;
`

const EditArea: React.StatelessComponent<{}> = styled.div`
  grid-area: edit;
`

const EditorLayout: React.StatelessComponent<{}> = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: 100%;
  grid-template-areas: 'left right';
`

const EditorLeft: React.StatelessComponent<{}> = styled.div`
  grid-area: left;
`

const EditorRight: React.StatelessComponent<{}> = styled.div`
  grid-area: right;
`

const assign = (Object.assign: any)

const VERSION = '3'
const LAST_SAVE_VERSION = 'last-save-version'
const STATE = 'state'

const initialState = {
  previewWidth: '640px',
  previewHeight: '480px',
  width: '100%',
  height: '100%',
  columns: ['1fr'],
  rows: ['1fr'],
  rowCount: 1,
  columnCount: 1,
  cells: [{ id: 0, gridArea: 'g0' }],
  selectedPaneId: null
}

const controllerX = '60px'
const controllerY = '30px'

const addPx = (...vals: string[]) => {
  const sum = vals.reduce((acc, val) => {
    const n = Number(val.replace('px', ''))
    return acc + n
  }, 0)
  return `${sum}px`
}

export default class Home extends React.Component<{}, GridState> {
  state = initialState

  componentDidMount() {
    const lastSaveVersion = window.localStorage.getItem(LAST_SAVE_VERSION)

    if (VERSION !== lastSaveVersion) {
      window.localStorage.clear()
      return
    }

    const lastState = window.localStorage.getItem(STATE)
    if (lastState) {
      const state = JSON.parse(lastState)
      this.setState(state)
      console.log('loaded last state')
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem(STATE, JSON.stringify(this.state))
    window.localStorage.setItem(LAST_SAVE_VERSION, VERSION)
    console.log('saved')
  }

  render() {
    const {
      cells,
      columns,
      rows,
      width,
      height,
      previewWidth,
      previewHeight
    } = this.state

    const gridTemplateAreas = cellsToAreas(this.state)
    console.log('columns', columns)
    console.log('rows', rows)
    console.log('gridTemplateAreas')
    console.log('cells', cells.map(c => c.gridArea))
    console.log(gridTemplateAreas.replace(/' '/g, "'\n'"))

    const containerStyle = {
      width,
      height,
      display: 'grid',
      gridTemplateColumns: columns.join(' '),
      gridTemplateRows: rows.join(' '),
      gridTemplateAreas
    }

    const gridAreas = uniq(cells.map(c => c.gridArea))

    const realContainerWidth =
      previewWidth.indexOf('%') > -1
        ? previewWidth
        : addPx(controllerX, previewWidth, controllerX)

    const realContainerHeight =
      previewHeight.indexOf('%') > -1
        ? previewHeight
        : addPx(controllerY, previewHeight, controllerY)

    return (
      <Fragment>
        <Root>
          <EditorLayout>
            <EditorLeft>
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
                    <ColumnsArea>
                      <ColumnsEditor
                        columns={columns}
                        onChangeColumn={(index, value) => {
                          this.setState({
                            ...this.state,
                            columns: assign([], columns, {
                              [index]: value
                            })
                          })
                        }}
                      />
                    </ColumnsArea>
                    <RowsArea>
                      <RowsEditor
                        rows={rows}
                        onChangeRow={(index, value) => {
                          this.setState({
                            ...this.state,
                            rows: assign([], rows, {
                              [index]: value
                            })
                          })
                        }}
                      />
                    </RowsArea>
                    <AddRowsButtonArea>
                      <button onClick={() => this.setState(addRow)}>+</button>
                      <button onClick={() => this.setState(deleteRow)}>
                        -
                      </button>
                    </AddRowsButtonArea>
                    <AddColumnsButtonArea>
                      <button onClick={() => this.setState(addColumn)}>
                        +
                      </button>
                      <button onClick={() => this.setState(deleteColumn)}>
                        -
                      </button>
                    </AddColumnsButtonArea>
                    <EditArea>
                      <div style={containerStyle}>
                        {gridAreas.map((gridArea, index) => {
                          const includedCells = cells.filter(
                            cell => cell.gridArea === gridArea
                          )
                          const { id } = includedCells[0]
                          return (
                            <PaneEditor
                              key={index}
                              gridArea={gridArea}
                              cells={includedCells}
                              onSet={value =>
                                this.setState(s => updateCellName(s, id, value))
                              }
                              onClickBreak={() => {
                                this.setState(s => breakPanes(s, gridArea))
                              }}
                            />
                          )
                        })}
                      </div>
                    </EditArea>
                  </GridEditorLayout>
                </div>
              </div>
            </EditorLeft>
            <EditorRight>
              <Menu
                previewWidth={previewWidth}
                previewHeight={previewHeight}
                width={width}
                height={height}
                onClickReset={() => {
                  window.localStorage.clear()
                  this.setState(initialState)
                }}
                onClickHolyGrail={() => {
                  window.localStorage.clear()
                  this.setState(holyGrailData)
                }}
                onChangeValue={(key, value) => {
                  window.localStorage.clear()
                  this.setState({ [key]: value })
                }}
              />
            </EditorRight>
          </EditorLayout>
        </Root>
        {/* <hr />
        <Output
          gridState={this.state}
          containerStyle={containerStyle}
          gridAreas={gridAreas}
        /> */}
      </Fragment>
    )
  }
}
