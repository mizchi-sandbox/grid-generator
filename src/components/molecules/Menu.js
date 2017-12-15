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
    <Fragment>
      <div>
        <button
          onClick={_ => {
            onClickReset()
          }}
        >
          RESET
        </button>
      </div>
      <div>
        width:
        <input
          value={width}
          onChange={ev => onChangeValue('width', ev.target.value)}
        />
      </div>
      <div>
        height:
        <input
          value={height}
          onChange={ev => onChangeValue('height', ev.target.value)}
        />
      </div>
    </Fragment>
  )
}
