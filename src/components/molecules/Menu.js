/* @flow */
import React, { Fragment } from 'react'
export default function Menu({
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
      GridGen
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
      <div>
        width:
        <br />
        <input
          value={width}
          onChange={ev => onChangeValue('width', ev.target.value)}
        />
      </div>
      <div>
        height:
        <br />
        <input
          value={height}
          onChange={ev => onChangeValue('height', ev.target.value)}
        />
      </div>
    </div>
  )
}
