/* @flow */
import * as React from 'react'
import range from 'lodash.range'
import StyleLengthInput from '../atoms/StyleLengthInput'

type Props = {
  columns: string[],
  onChangeColumnValue: (index: number, value: string) => void
}

export default function GridColumnsEditor({
  columns,
  onChangeColumnValue
}: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns.join(' '),
        gridTemplateAreas:
          '"' +
          range(columns.length)
            .map(i => 'g' + i.toString())
            .join(' ') +
          '"'
      }}
    >
      {columns.map((column, index) => {
        return (
          <div key={index} style={{ gridArea: 'g' + index.toString() }}>
            <StyleLengthInput
              value={column}
              onChangeValidly={value => {
                onChangeColumnValue(index, value)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
