/* @flow */
import type { EditMode } from '../../reducers/gridManager'
import React from 'react'
import type { GridState, Cell } from '../../domain/GridState'
import holyGrailData from '../../domain/presets/holyGrail'
import simpleData from '../../domain/presets/simple'
export default function Menu({
  cells,
  editMode,
  selectedCellId,
  previewWidth,
  previewHeight,
  width,
  height,
  onChangeValue,
  onSelectPreset,
  onChangeEditMode
}: {
  cells: Cell[],
  editMode: EditMode,
  selectedCellId: ?number,
  previewWidth: string,
  previewHeight: string,
  width: string,
  height: string,
  onChangeValue: (key: string, value: string) => void,
  onChangeSelectedCell: (cellId: number, key: string, value: string) => void,
  onChangeEditMode: (mode: EditMode) => void,
  onSelectPreset: (data: GridState) => void
}) {
  const selectedCell = cells.find(cell => cell.id === selectedCellId)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#444',
        color: '#ddd'
      }}
    >
      <div
        style={{
          padding: '15px'
        }}
      >
        <div>CSS Grid Editor</div>
        <hr />
        <div>EditMode</div>
        {['panes', 'cells', 'output'].map(mode => {
          if (mode === editMode) {
            return <span key={editMode}>{'[' + mode + ']'}</span>
          }
          return (
            <button
              key={mode}
              onClick={_ => {
                onChangeEditMode(mode)
              }}
            >
              {mode}
            </button>
          )
        })}
        {[
          {
            name: 'previewWidth',
            value: previewWidth
          },
          {
            name: 'previewHeight',
            value: previewHeight
          }
        ].map((el, index) => {
          return (
            <div key={index}>
              {el.name}:
              <br />
              <input
                value={el.value}
                onChange={ev => onChangeValue(el.name, ev.target.value)}
              />
            </div>
          )
        })}
        <hr />
        <div>Load preset</div>
        <button
          onClick={_ => {
            onSelectPreset(simpleData)
          }}
        >
          Simple
        </button>
        <button
          onClick={_ => {
            onSelectPreset(holyGrailData)
          }}
        >
          HolyGrail
        </button>
        <hr />
        <div>
          Root
          {selectedCellId && <span>{' > cell[' + selectedCellId + ']'}</span>}
        </div>
        {selectedCell == null ? (
          [
            {
              name: 'width',
              value: width
            },
            {
              name: 'height',
              value: height
            }
          ].map((el, index) => {
            return (
              <div key={index}>
                {el.name}:
                <br />
                <input
                  value={el.value}
                  onChange={ev => onChangeValue(el.name, ev.target.value)}
                />
              </div>
            )
          })
        ) : (
          <div>
            {/* {[
              {
                name: 'gridArea',
                value: selectedCell.gridArea
              },
              {
                name: 'children',
                value: selectedCell.children
              },
              {
                name: 'hoc',
                value: 'wip'
              }
            ].map((el, index) => {
              return (
                <div key={index}>
                  {el.name}:
                  <br />
                  <input
                    value={el.value}
                    onChange={ev =>
                      onChangeSelectedCell(
                        selectedCell.id,
                        el.name,
                        ev.target.value
                      )
                    }
                  />
                </div>
              )
            })} */}
          </div>
        )}
        <hr />

        <h3>Shortcut</h3>
        <dl>
          <dt>Ctrl-1</dt>
          <dd>Pane Mode</dd>
          <dt>Ctrl-2</dt>
          <dd>Cell Mode</dd>
          <dt>Ctrl-3</dt>
          <dd>Output Mode</dd>
          <dt>Shift-Arrow</dt>
          <dd>Expand/Shrink</dd>
        </dl>
      </div>
    </div>
  )
}
