/* @flow */
import type { Pane } from '../../domain/GridState'
import React, { Fragment } from 'react'
import Centerize from '../atoms/Centerize'
import EditableText from '../atoms/EditableText'

type Props = {
  pane: Pane,
  onSet: Function,
  onClickBreak: Function
}

export default function PaneEditor(props: Props) {
  const { onSet, onClickBreak, pane: { cells, gridArea } } = props

  return (
    <div
      style={{
        gridArea,
        boxSizing: 'content-box',
        outline: '1px dashed black',
        width: '100%',
        height: '100%'
      }}
    >
      <Centerize>
        <EditableText
          onDetermine={value => onSet(value)}
          onCancel={_value => {}}
          initialValue={gridArea}
          render={value => {
            return (
              <Fragment>
                <span>{value}</span>
                {cells.length > 1 && (
                  <div>
                    <button onClick={() => onClickBreak()}>break</button>
                  </div>
                )}
              </Fragment>
            )
          }}
        />
      </Centerize>
    </div>
  )
}
