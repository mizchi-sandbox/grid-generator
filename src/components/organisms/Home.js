/* @flow */
import type { GridState } from '../../domain/GridState'
import React, { Fragment } from 'react'
import uniq from 'lodash.uniq'
import PaneEditor from '../atoms/PaneEditor'
import Output from '../atoms/Output'
import RowsEditor from '../atoms/RowsEditor'
import ColumnsEditor from '../atoms/ColumnsEditor'
import Menu from '../molecules/Menu'
import {
  deleteRow,
  deleteColumn,
  addRow,
  addColumn,
  cellsToAreas,
  updateCellName,
  breakPanes
} from '../../domain/GridState'

const assign = (Object.assign: any)

const VERSION = '3'
const LAST_SAVE_VERSION = 'last-save-version'
const STATE = 'state'

const initialState = {
  previewWidth: '640px',
  previewHeight: '480px',
  width: '640px',
  height: '480px',
  columns: ['1fr'],
  rows: ['1fr'],
  rowCount: 1,
  columnCount: 1,
  cells: [{ gridArea: 'g0', id: 0 }],
  selectedPaneId: null
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
    const { cells, columns, rows, width, height } = this.state

    const containerStyle = {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: columns.join(' '),
      gridTemplateRows: rows.join(' '),
      gridTemplateAreas: cellsToAreas(this.state)
    }

    const gridAreas = uniq(cells.map(c => c.gridArea))

    return (
      <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: `
                    60px ${width} 50px
                  `,
                  gridTemplateRows: `
                    30px
                    1fr
                    30px
                  `,
                  gridTemplateAreas: `
              "_0   columns addc"
              "rows table   _1"
              "addr _2      _3"
            `
                }}
              >
                <div style={{ gridArea: 'columns' }}>
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
                </div>
                <div style={{ gridArea: 'rows' }}>
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
                </div>
                <div style={{ gridArea: 'addr' }}>
                  <button onClick={() => this.setState(addRow)}>+</button>
                  <button onClick={() => this.setState(deleteRow)}>-</button>
                </div>
                <div style={{ gridArea: 'addc' }}>
                  <button onClick={() => this.setState(addColumn)}>+</button>
                  <button onClick={() => this.setState(deleteColumn)}>-</button>
                </div>
                <div
                  style={{
                    gridArea: 'table',
                    width,
                    height
                  }}
                >
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
                </div>
              </div>
            </div>
            <div style={{ width: '180px' }}>
              <Menu
                width={width}
                height={height}
                onClickReset={() => {
                  window.localStorage.clear()
                  this.setState(initialState)
                }}
                onChangeValue={(key, value) => {
                  window.localStorage.clear()
                  this.setState({ [key]: value })
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <Output gridState={this.state} containerStyle={containerStyle} />
      </Fragment>
    )
  }
}
