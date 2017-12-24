/* @flow */
import type { Cell } from '../../domain/GridState'
import React, { Fragment } from 'react'
import Centerize from './Centerize'
import EditableText from './EditableText'

type Props = {
  cell: Cell,
  selected: boolean,
  onSet: Function,
  onSelect: Function
}

export default function CellEditor(props: Props) {
  const { onSet, cell, onSelect, selected } = props

  return (
    <div
      style={{
        gridArea: 'g' + cell.id,
        boxSizing: 'content-box',
        outline: '1px dashed black',
        width: '100%',
        height: '100%',
        backgroundColor: selected ? '#fcc' : 'transparent'
      }}
      onClick={_ => {
        onSelect()
      }}
    >
      <Centerize>
        <EditableText
          onDetermine={value => onSet(value)}
          initialValue={cell.gridArea}
          render={_ => {
            return (
              <Fragment>
                {cell.gridArea}
                {cell.children && `[${cell.children}]`}
              </Fragment>
            )
          }}
        />
      </Centerize>
    </div>
  )
}
