/* @flow */
import React, { Fragment } from 'react'
export default function Menu({
  previewWidth,
  previewHeight,
  width,
  height,
  onChangeValue,
  onClickReset
}: {
  width: string,
  height: string,
  onChangeValue: (key: string, value: string) => void,
  onClickReset: () => void
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '12px',
        boxSizing: 'content-box',
        backgroundColor: '#444',
        color: '#ddd'
      }}
    >
      <h2>GridEditor</h2>
      <div>
        <button
          onClick={_ => {
            onClickReset()
          }}
        >
          RESET
        </button>
      </div>
      <hr />
      <span>Container</span>
      {[
        {
          name: 'previewWidth',
          value: previewWidth
        },
        {
          name: 'previewHeight',
          value: previewHeight
        },
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
  )
}
