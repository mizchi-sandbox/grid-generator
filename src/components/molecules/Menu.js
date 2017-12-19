/* @flow */
import React from 'react'
import type { GridState } from '../../domain/GridState'
import holyGrailData from '../../domain/presets/holyGrail'
import simpleData from '../../domain/presets/simple'
export default function Menu({
  previewWidth,
  previewHeight,
  width,
  height,
  onChangeValue,
  onSelectPreset
}: {
  previewWidth: string,
  previewHeight: string,
  width: string,
  height: string,
  onChangeValue: (key: string, value: string) => void,
  onSelectPreset: (data: GridState) => void
}) {
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
        <div>Root</div>
        {[
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
        })}
      </div>
    </div>
  )
}
